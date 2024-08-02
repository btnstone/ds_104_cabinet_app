export interface UserQuery {
  /**
   * 认证方式:
   * password：密码认证
   * fingerprint：指纹认证
   */
  grant_type: string;
  /**
   * 应用标识:
   */
  client_id: string;
  /**
   * 应用安全密钥:
   */
  client_secret: string;
  /**
   * 员工号/柜员号:
   */
  username: string;

  // grant_type=password
  /**
   * 密码:
   * 经过SM3不可逆加密算法加密后的密码
   */
  password: string;

  // grant_type=fingerprint
  /**
   * 指纹设备厂家代码
   * 非必输参数，根据传入的code值分别调用不同指纹仪厂家的指纹比对算法，现已支持的厂家有天诚盛业、中正、维尔。不传该参数默认使用天诚盛业的比对算法。
   * 各指纹仪厂商的代码如下：
   * 天诚盛业：TianChengShengYe
   * 中正：ZhongZheng
   * 方立：Ferly
   * 维尔：WellCom
   * 中控智慧：ZKTeco
   */
  productCode: string;
  /**
   * 指纹特征数据
   */
  fingerprint: string;
}

export interface UserVo {
  /**
   * 用户id
   */
  uid: string;
  /**
   * 用户密码是否即将过期
   * 1：即将过期
   * 0：未即将过期
   * 密码认证成功时返回
   */
  closetoExpires: string;

  /**
   * 授权码token值
   * 令牌票据，成功时返回
   * String 50 N
   */
  access_token: string;
  /**
   * 刷新授权令牌
   * 根据刷新token可以生成新的授权码token，成功时返回
   * String 50 N
   */
  refresh_token: string;
  /**
   * token过期时间
   * 单位：秒，成功时返回
   * String 5 N
   */
  expires_in: string;
}
