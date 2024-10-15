import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) {}

    async register(username: string, email: string, password: string): Promise<UserDocument> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new this.userModel({ username, email, password: hashedPassword });
        
        return newUser.save();
    }

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({email})
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException('Invalid credentials');
          }

    const payload = { username: user.username, sub: user._id };
        return {
        access_token: this.jwtService.sign(payload),
        };
    }

    async validateUser(userId: string): Promise<User> {
        return this.userModel.findById(userId);
      }
}