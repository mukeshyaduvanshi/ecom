import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { AdminGuard } from 'src/auth/roles.guard';
import { UpdateStatusDto } from './dto/update-status.dto';

@Controller('orders')
@UseGuards(JwtAuthGuard) // sare routes ke liye login zaroori
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  // Login User Create new Order
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @GetUser() user: any) {
    return this.orderService.create(user.userId, createOrderDto);
  }

  // Logged-in user see your orders
  @Get('my-orders')
  findMyOrders(@GetUser() user: any) {
    return this.orderService.findMyOrder(user.userId);
  }

  // Only Admin
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  // Only Admin can change status
  @UseGuards(AdminGuard)
  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.orderService.updateStatus(id, updateStatusDto);
  }
}
