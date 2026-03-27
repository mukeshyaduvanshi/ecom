import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<UserDocument>
    ) {}

    // Email se user find
    async findByEmail(email:string): Promise<UserDocument | null> {
        return this.userModel.findOne({email})
    }

    // create new user
    create(userData: Partial<User>): Promise<UserDocument> {
        const user = new this.userModel(userData)
        return user.save();
    }
}
