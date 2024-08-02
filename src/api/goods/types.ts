export interface GoodVO {
  // 名称/长度/是否可以为空
  /**
   * 电子标签码 32 N
   */
  electagNo?: string;
  /**
   * 重要实物类型（1-凭证 2-重要物品 3-代保管品 4-其他）2 N
   */
  goodsType?: string;
  /**
   * 凭证种类 3
   */
  voucherType?: string;
  /**
   * 凭证数量 20
   */
  voucherNumber?: string;
  /**
   * 凭证批号 10
   */
  voucherBatchnumber?: string;
  /**
   * 起始凭证序号 12
   */
  voucherStartno?: string;
  /**
   * 终止凭证序号 12
   */
  voucherEndno?: string;
  /**
   * 三级重要物品编号 8
   */
  importgoodsThirdLevelId?: string;
  /**
   * 三级重要物品名称 300
   */
  importgoodsThirdLevelname?: string;
  /**
   * 起始物品号 16
   */
  importgoodsStartno?: string;
  /**
   * 终止物品号 16
   */
  importgoodsEndno?: string;
  /**
   * 重要物品数量 20
   */
  importgoodsNumber?: string;
  /**
   * 代保管品种类 16
   */
  custodygoodsType?: string;
  /**
   * 代保管品编号 30
   */
  custodygoodsId?: string;
  /**
   * 记账数量 20
   */
  custodygoodsQuantity?: string;
  /**
   * 柜格编号 2
   */
  cellNo?: number;

}

export interface CertificateVO {
  isShowDetail?: boolean;
}
