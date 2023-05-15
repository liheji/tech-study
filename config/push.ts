/**
 * @description 推送配置
 * @link {@link https://www.pushplus.plus/ PushPlus 官网}
 * @link {@link https://mail.qq.com/ QQ邮箱官网}
 */
const PUSH_CONFIG = {
  /**
   * @description 启用推送
   * @example true 启用推送 false 禁用推送
   */
  enabled: true,
  /**
   * @description 发送服务消息昵称
   */
  nick: '管理员',
  /**
   * @description 发送服务消息来源
   */
  from: 'tech-study-node',
  /**
   * @description 推送方式（email, pushpush）
   */
  pushType: 'email',
  /**
   * @description PushPush token 配置
   */
  token: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  /**
   * @description Email 配置
   */
  email: {
    /**
     * @description SMTP 地址
     */
    smtp: 'smtp.xxx.xxx',
    /**
     * @description SSL 端口
     */
    sslPort: 465,
    /**
     * @description 发送人
     */
    nickname: '憶夣',
    /**
     * @description 邮箱账号
     */
    username: 'xxxxxxxxxx@xxx.xxx',
    /**
     * @description 邮箱授权码
     */
    secretKey: 'xxxxxxxxxxxxxxxx'
  }
};
export default PUSH_CONFIG;
