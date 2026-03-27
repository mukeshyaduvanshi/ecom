import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {JwtService} from '@nestjs/jwt'
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto) {
        // Check email is exist or not
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if(existingUser) {
            throw new ConflictException('Email already registered!')
        }
        // convert the password in hash
        const hashedPassword = await bcrypt.hash(registerDto.password,10)
        
        // Create User
        const user =  await this.usersService.create({
            name: registerDto.name,
            email: registerDto.email,
            password: hashedPassword
        });

        // Create Token
        const token = this.jwtService.sign({
            userId: user._id,
            email: user.email,
            role: user.role,
        });

        return {
            message: 'Registration Successful!',
            access_token: token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            },
        };
    }

    async login(loginDto: LoginDto) {
        // User Check
        const user = await this.usersService.findByEmail(loginDto.email)
        if(!user) {
            throw new UnauthorizedException('This email is not register')
        }
        
        // Password check
        const isPasswordValid = await bcrypt.compare(loginDto.password, user.password)
        if(!isPasswordValid) {
            throw new UnauthorizedException('Invalid Password')
        }

        const token = this.jwtService.sign({
            userId: user._id,
            email: user.email,
            role: user.role,
        });

        return {
            message: "Login successful!",
            access_token: token,
            user: {
                id: user._id,
                name: user.name,
                email:user.email,
                role: user.role,
            },
        };
    }
}
