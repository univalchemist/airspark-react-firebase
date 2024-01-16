export enum DataKeys {
  ToplessWaitersSettings = "Topless Waiters Settings",
  ToplessWaitersGames = "Topless Waiters Games",
  LifeDrawingOptions = "Life Drawing Options",
  BodyPaintingOptions = "Body Painting Options",
  BodyPaintingSettings = "Body Painting Settings",
  StrippersOptions = "Strippers Options",
}

export interface IData {
  Services: Array<any>;
  [DataKeys.ToplessWaitersSettings]: Array<any>;
  [DataKeys.ToplessWaitersGames]: Array<any>;
  [DataKeys.LifeDrawingOptions]: Array<any>;
  [DataKeys.BodyPaintingOptions]: Array<any>;
  [DataKeys.BodyPaintingSettings]: Array<any>;
  [DataKeys.StrippersOptions]: Array<any>;
  Settings: Array<any>;
  Descriptions: Array<any>;
  Cities: Array<any>;
}

export interface IToplessWaiters {
  Number: number;
  "Bare Buns": boolean;
  Games: Array<string>;
  Hours: number;
}

export interface ILifeDrawing {
  Option: string;
}

export interface IBodyPainting {
  Option: string;
  Guests: number;
}

export interface IStrippers {
  Option: string;
}

export enum SERVICE_NAMES {
  ToplessWaiters = "Topless Waiters",
  LifeDrawing = "Life Drawing",
  BodyPainting = "Body Painting",
  Strippers = "Strippers",
}

export interface IServices {
  [key: string]:
  | IToplessWaiters
  | ILifeDrawing
  | IStrippers
  | IBodyPainting
  | undefined;
  [SERVICE_NAMES.ToplessWaiters]?: IToplessWaiters;
  [SERVICE_NAMES.LifeDrawing]?: ILifeDrawing;
  [SERVICE_NAMES.BodyPainting]?: IBodyPainting;
  [SERVICE_NAMES.Strippers]?: IStrippers;
}

export enum InformationKeys {
  Name = "Name",
  FirstName = "First Name",
  LastName = "Last Name",
  Email = "Email",
  PhoneNumber = "Phone Number",
  Message = "Message",
}

export enum EventKeys {
  EventDate = "Event Date",

  City = "City",
  Address = "Address",
  LocationUrl = "Location Url",
  TravelCost = "Travel Cost",
  TravelTime = "Travel Time",

  Details = "Details",
  Distance = "Distance",
}

export interface IEvent {
  [EventKeys.EventDate]?: string;

  [EventKeys.City]?: string;
  [EventKeys.Address]?: string;
  [EventKeys.LocationUrl]?: string;
  [EventKeys.TravelCost]?: number;
  [EventKeys.TravelTime]?: string;
  [EventKeys.Distance]?: string;

  [EventKeys.Details]?: string;
}
export interface IInformation {
  [InformationKeys.Name]?: string;
  [InformationKeys.FirstName]?: string;
  [InformationKeys.LastName]?: string;
  [InformationKeys.Email]?: string;
  [InformationKeys.PhoneNumber]?: string;
  [InformationKeys.Message]?: string;
}

export interface IAppState {
  data: IData | null;
  stage: number;
  services: IServices;
  event: IEvent;
  information: IInformation;
  subtotal: number;
}
