export interface IRouteSet {
  path: string;
  method: string;
}

export interface ILayerRoute {
  path: string;
  stack: Array<ILayer>;
  methods: {
    [k: string]: boolean;
  };
}

export interface ILayer {
  handle: () => {};
  name: string;
  params: any;
  path: any;
  keys: Array<any>;
  regexp: RegExp;
  method: string;
  route: ILayerRoute;
}
