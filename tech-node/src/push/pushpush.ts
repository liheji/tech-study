import axios from "axios";
import {CommonOptions} from "./common"

/**
 * @description PushPush配置
 */
export type PushOptions = {
    common: CommonOptions,
    fromToken: string;
    toToken?: string;
};

/**
 * @description 推送
 * @param push
 * @returns
 */
export const pushPlus = async (push: PushOptions) => {
    try {
        // 参数体
        const body: {
            token: string;
            title: string;
            content: string;
            template: string;
            to?: string;
        } = {
            token: push.fromToken,
            title: push.common.title,
            content: push.common.content,
            template: push.common.template,
        };
        // 好友令牌
        if (push.toToken) {
            body.to = push.toToken;
        }
        // 推送
        const res = await axios.post('http://www.pushplus.plus/send', body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // 请求成功
        if (res.status === 200) {
            const {data} = res;
            return data;
        }
    } catch (error) {
    }
};
