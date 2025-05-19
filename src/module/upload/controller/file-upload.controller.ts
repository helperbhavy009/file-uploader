import {
  Controller,
  Post,
  UseGuards,
  UploadedFile,
  Body,
  UseInterceptors,
  Get,
  Param,
  NotFoundException,
  Request,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JWTAuthGuard } from 'src/guards/jwt.guard';
import { FileUploadService } from '../service/file-upload.service';
import { UploadFileDto } from '../dto/upload-file.dto';

@ApiTags('Files')
@Controller('upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          cb(null, `${Date.now()}${extname(file.originalname)}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    }),
  )
  @ApiConsumes('multipart/form-data')
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() meta: UploadFileDto,
    @Request() req: any,
  ) {
    return this.fileUploadService.handleUpload(file, meta, req.user);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(JWTAuthGuard)
  async getFile(@Param('id') id: number, @Request() req) {
    const file = await this.fileUploadService.getFileById(id, req.user);
    if (!file) throw new NotFoundException('File not found');
    return file;
  }
}
