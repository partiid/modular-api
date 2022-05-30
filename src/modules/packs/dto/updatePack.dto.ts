import { PartialType } from '@nestjs/mapped-types';
import { CreatePackDto } from './createPack.dto';

export class UpdatePackDto extends PartialType(CreatePackDto) {}
