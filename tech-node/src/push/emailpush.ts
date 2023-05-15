const nodemailer = require("nodemailer");
import {CommonOptions} from "./common"

/**
 * @description 邮箱配置
 */
export type EmailOptions = {
    common: CommonOptions,
    smtp: string,
    sslPort: number,
    nickname: string,
    username: string,
    secretKey: string
    toEmail?: string
};

/**
 * @description 邮箱推送
 * @param push
 * @returns
 */
export const emailPlus = async (push: EmailOptions) => {
    try {
        // 发送邮件
        const transport = nodemailer.createTransport({
            host: push.smtp,
            port: push.sslPort,
            secure: true,
            auth: {
                user: push.username,
                pass: push.secretKey
            },
            tls: {
                rejectUnauthorized: false,
            }
        });
        // 参数体
        const receiver = {
            from: `${push.nickname}<${push.username}>`,
            subject: push.common.title,
            to: push.username,
            html: push.common.content
        };
        // 好友邮箱
        if (push.toEmail) {
            receiver.to = push.toEmail;
        }
        // 发送邮件
        transport.sendMail(receiver, (error: any) => {
            if (error) {
                console.log(error);
            }
            transport.close();
        });
    } catch (error) {
    }
};
