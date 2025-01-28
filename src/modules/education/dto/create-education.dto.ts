import { ApiProperty } from '@nestjs/swagger';

export class DonationDTO {
  @ApiProperty()
  organizationID: string;

  @ApiProperty()
  receiptNo: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sumof: number;

  @ApiProperty()
  mode: string;

  @ApiProperty({ required: false })
  checkno?: string;

  @ApiProperty({ required: false })
  dated?: Date;

  @ApiProperty({ required: false })
  drawnOn?: string;

  @ApiProperty({ required: false })
  donatedAs?: string;

  @ApiProperty({ required: false })
  amount?: number;

  @ApiProperty({ required: false })
  fortrust?: string;
}
