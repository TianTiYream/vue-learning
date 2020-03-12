从“ ./vue”导入{Vue，CreateElement，CombinedVueInstance};
从“ ./vnode”导入{VNode，VNodeData，VNodeDirective，NormalizedScopedSlot}；

类型构造函数= {
  new（... args：any []）：任何;
}

//我们不支持异步组件中的推断道具
// NB ComponentOptions <V>是逆向的，默认泛型应为底部类型
导出类型Component <Data = DefaultData <never>，Methods = DefaultMethods <never>，Computed = DefaultComputed，Props = DefaultProps> =
  | Vue类型
  | FunctionalComponentOptions <道具>
  | ComponentOptions <从不，数据，方法，计算的，道具>

接口EsModuleComponent {
  默认值：组件
}

导出类型AsyncComponent <Data = DefaultData <never>，Methods = DefaultMethods <never>，Computed = DefaultComputed，Props = DefaultProps>
  = AsyncComponentPromise <数据，方法，计算值，道具>
  | AsyncComponentFactory <数据，方法，计算出的道具>

导出类型AsyncComponentPromise <Data = DefaultData <never>，Methods = DefaultMethods <never>，Computed = DefaultComputed，Props = DefaultProps> =（
  解决：（组件：Component <Data，Methods，Compute，Props>）=>无效，
  拒绝：（原因？：任意）=>无效
）=> Promise <组件| EsModuleComponent> | 虚空

导出类型AsyncComponentFactory <Data = DefaultData <never>，Methods = DefaultMethods <never>，Computed = DefaultComputed，Props = DefaultProps> =（）=> {
  组件：AsyncComponentPromise <数据，方法，计算的，道具>；
  正在加载？EsModuleComponent;
  错误？：组件| EsModuleComponent;
  延迟？
  超时？
}

/ **
 *当推断出“ ComponentOptions”上的“ Computed”类型参数时，
 *它应该具有每个get-accessor的返回类型的属性。
 *由于无法查询函数的返回类型，因此我们允许TypeScript
 *从Accessors <Computed>的形状推断并向后工作。
 * /
导出类型Accessors <T> = {
  [T的key中的K]：（（）=> T [K]）| ComputedOptions <T [K]>
}

类型DataDef <数据，道具，V> =数据| （（this：Readonly <Props>＆V）=>数据）
/ **
 *当字符串数组用于组件的“ props”值时，应使用此类型。
 * /
导出类型ThisTypedComponentOptionsWithArrayProps <V扩展Vue，Data，Methods，Compute，PropNames扩展字符串> =
  对象和
  ComponentOptions <V，DataDef <数据，Record <PropNames，任何>，V>，方法，计算的，PropNames []，Record <PropNames，任何>>和
  ThisType <CombinedVueInstance <V，数据，方法，计算的，只读的<Record <PropNames，任何>>>>;

/ **
 *当映射到PropOptions的对象用作组件的props值时，应使用此类型。
 * /
导出类型ThisTypedComponentOptionsWithRecordProps <V扩展了Vue，Data，Methods，Compute，Props> =
  对象和
  ComponentOptions <V，DataDef <数据，Props，V>，方法，已计算，RecordPropsDefinition <Props>，Props>和
  ThisType <CombinedVueInstance <V，数据，方法，计算的，只读<道具>>>;

类型DefaultData <V> =对象| （（this：V）=>对象）;
类型DefaultProps = Record <string，any>;
类型DefaultMethods <V> = {[key：string]：（this：V，... args：any []）=> any};
类型DefaultComputed = {[key：string]：any};
导出接口ComponentOptions <
  V延伸Vue，
  数据= DefaultData <V>，
  方法= DefaultMethods <V>，
  Computed = DefaultComputed，
  PropsDef = PropsDefinition <DefaultProps>，
  道具=默认道具> {
  数据？：数据；
  道具？：PropsDef;
  propsData ?:对象;
  已计算？：Accessors <Computed>;
  方法？：方法；
  看？：记录<字符串，WatchOptionsWithHandler <any> | WatchHandler <任何> | 字符串>;

  el ?：元素| 串;
  template ?:字符串;
  // hack用于功能组件类型推断，不应在用户代码中使用
  渲染？（createElement：CreateElement，hack：RenderContext <Props>）：VNode;
  renderError？（createElement：CreateElement，err：Error）：VNode;
  staticRenderFns ?:（（（createElement：CreateElement）=> VNode）[];

  beforeCreate？（this：V）：void;
  创建了吗？
  beforeDestroy？（）：无效;
  是否已销毁？
  beforeMount？（）：void;
  已安装？（）：无效；
  beforeUpdate？（）：无效;
  更新了吗？
  已激活？（）：无效；
  已停用？（）：无效；
  errorCaptured？（错误：错误，vm：Vue，信息：字符串）：布尔值| 虚空
  serverPrefetch？（this：V）：承诺<void>;

  指令？：{[key：string]：DirectiveFunction | DirectiveOptions};
  组件？：{[key：string]：组件<任何，任何，任何> AsyncComponent <任何，任何，任何>};
  转换？：{[key：string]：object};
  过滤器？：{[key：string]：Function};

  提供？（（）=>对象）;
  inject ?: InjectOptions;

  型号？：{
    道具？：字符串;
    事件？：字符串；
  };

  父母？：Vue；
  mixins ?:（ComponentOptions <Vue> | typeof Vue）[];
  名称？：字符串；
  // TODO：支持正确推断的“扩展”
  是否扩展？：ComponentOptions <Vue> | Vue的类型；
  分隔符？：[string，string];
  评论？：布尔值；
  InheritAttrs ?:布尔值;
}

导出接口FunctionalComponentOptions <Props = DefaultProps，PropDefs = PropsDefinition <Props >> {
  名称？：字符串；
  道具？：PropDefs；
  型号？：{
    道具？：字符串;
    事件？：字符串；
  };
  inject ?: InjectOptions;
  功能：布尔值；
  渲染？（此：未定义，createElement：CreateElement，上下文：RenderContext <Props>）：VNode | VNode [];
}

导出接口RenderContext <Props = DefaultProps> {
  道具：道具；
  子代：VNode [];
  slot（）：任何；
  数据：VNodeData;
  父母：Vue；
  侦听器：{[key：string]：功能| 函数[]};
  scopedSlots：{[key：string]：NormalizedScopedSlot};
  注射剂：任何
}

导出类型Prop <T> = {（）：T} | {new（... args：never []）：T和对象} | {new（... args：string []）：函数}

导出类型PropType <T> = Prop <T> | 道具<T> [];

导出类型PropValidator <T> = PropOptions <T> | PropType <T>;

导出接口PropOptions <T = any> {
  类型？：PropType <T>;
  是否需要？：布尔值；
  默认值：T | 空| 未定义 （（）=> T | null |未定义）;
  验证器？（值：T）：布尔值;
}

导出类型RecordPropsDefinition <T> = {
  [T键中的K]：PropValidator <T [K]>
}
导出类型ArrayPropsDefinition <T> =（T的键）[];
导出类型PropsDefinition <T> = ArrayPropsDefinition <T> | RecordPropsDefinition <T>;

导出接口ComputedOptions <T> {
  得到？（）：T;
  设置？（值：T）：无效;
  缓存？：布尔值；
}

导出类型WatchHandler <T> =（val：T，oldVal：T）=> void;

导出接口WatchOptions {
  深吗？
  立即？：布尔值；
}

导出接口WatchOptionsWithHandler <T>扩展了WatchOptions {
  处理程序：WatchHandler <T>;
}

导出接口DirectiveBinding扩展了Readonly <VNodeDirective> {
  只读修饰符：{[key：string]：boolean};
}

导出类型DirectiveFunction =（
  el：HTMLElement，
  绑定：DirectiveBinding，
  vnode：VNode，
  oldVnode：VNode
）=>无效；

导出接口DirectiveOptions {
  绑定？：DirectiveFunction;
  插入？：DirectiveFunction;
  更新？：DirectiveFunction;
  componentUpdated ?: DirectiveFunction;
  unbind ?: DirectiveFunction;
}

导出类型InjectKey =字符串| 符号;

导出类型InjectOptions = {
  [键：字符串]：InjectKey | {from ?: InjectKey，默认值？：any}
} | 串[];