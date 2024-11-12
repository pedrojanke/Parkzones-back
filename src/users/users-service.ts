/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginDto } from "./dtos/login.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async validatePassword(password: string): Promise<void> {
    const minLength = 8;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
  
    if (password.length < minLength) {
      throw new BadRequestException("A senha deve ter no mínimo 8 caracteres.");
    }
  
    if (!specialCharRegex.test(password)) {
      throw new BadRequestException(
        "A senha deve conter ao menos um caractere especial."
      );
    }
  
    if (await this.isWeakPassword(password)) {
      throw new BadRequestException(
        "A senha escolhida é considerada fraca. Escolha outra senha."
      );
    }
  }

  private async isWeakPassword(password: string): Promise<boolean> {
    const weakPasswords = [
      "12345678",
      "password",
      "123456789",
      "qwerty",
      "senha123",
      "abcdefg",
      "1234abcd",
    ];
    return weakPasswords.includes(password);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password } = createUserDto;

    await this.validatePassword(password);

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);

    Object.assign(user, updateUserDto);

    if (updateUserDto.password) {
      await this.validatePassword(updateUserDto.password);
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }

  async login(loginDto: LoginDto): Promise<User> {
    const { email, password } = loginDto;

    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException("Usuário não encontrado");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new UnauthorizedException("Credenciais inválidas");
    }

    return user;
  }
}
