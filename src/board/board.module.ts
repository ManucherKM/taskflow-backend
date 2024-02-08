import { StageModule } from '@/stage/stage.module'
import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BoardController } from './board.controller'
import { BoardService } from './board.service'
import { Board, BoardSchema } from './entities/board.entity'

@Module({
	imports: [
		MongooseModule.forFeature([{ name: Board.name, schema: BoardSchema }]),
		forwardRef(() => StageModule),
	],
	controllers: [BoardController],
	providers: [BoardService],
	exports: [BoardService],
})
export class BoardModule {}
