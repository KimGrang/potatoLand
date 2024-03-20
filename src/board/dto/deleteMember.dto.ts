import { PickType } from "@nestjs/swagger";
import { UpdateMemberDto } from "./updateMember.dto";

export class DeleteMemberDto extends PickType(UpdateMemberDto, ["memberId"]) {}
