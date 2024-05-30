import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { ProgressService } from "./progress.service";
import { Response } from "express";
import { ProgressDto } from "./progress.dto";

@Controller('progress')
export class ProgressController {
    constructor(private progressService: ProgressService){}

    @Get()
    async findAll(@Res() res: Response) {
        try {
            var progress = await this.progressService.findAll();

            res.status(HttpStatus.OK).json(progress);
        } catch (error) {
            res.status(HttpStatus.CONFLICT).json({ message: error.message });
        }
    }
    
    @Get("/last")
    async findLast(@Res() res: Response) {
        try {
            var progress = await this.progressService.findLast();

            res.status(HttpStatus.OK).json(progress);
        } catch (error) {
            res.status(HttpStatus.CONFLICT).json({ message: error.message });
        }
    }

    @Get("/search")
    async findOne(@Res() res: Response, @Query("id") id: string) {
        try {
            var progress = await this.progressService.findOne(id);

            res.status(HttpStatus.OK).json(progress);
        } catch (error) {
            res.status(HttpStatus.CONFLICT).json({ message: error.message });
        }
    }

    @Post()
    async save(@Res() res: Response, @Body() progressDto: ProgressDto) {
        try {
            var progress = await this.progressService.save(progressDto);
            
            res.status(HttpStatus.CREATED).json(progress);
        } catch (error) {
            res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
        }
    }

    @Put(":id")
    async update(@Res() res: Response, @Body() progressDto: ProgressDto, @Param("id") id: string) {
        try {
            var progress = await this.progressService.update(progressDto, id);

            res.status(HttpStatus.OK).json(progress);
        } catch (error) {
            res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
        }
    }

    @Delete(":id")
    delete(@Res() res: Response, @Param("id") id: string) {
        try {
            this.progressService.delete(id);

            res.status(HttpStatus.OK).json({ message: "Deleted sucessfully" });
        } catch (error) {
            res.status(HttpStatus.FORBIDDEN).json({ message: error.message });
        }
    }
}