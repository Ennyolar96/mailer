import { Body, HttpCode, JsonController, Post } from "routing-controllers";
import { Service } from "typedi";
import { SendMailRequest } from "./input";
import { SmtpService } from "./smtp.service";

@Service()
@JsonController("/")
export class SmtpController {
  constructor(private readonly smtpService: SmtpService) {}

  @Post("send")
  @HttpCode(200)
  async sendMail(@Body() payload: SendMailRequest) {
    return this.smtpService.sendMail(payload);
  }
}
