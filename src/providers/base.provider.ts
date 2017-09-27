import { Response } from "@angular/http";

export abstract class BaseProvider {
  protected extractData(res: Response) {
    return res.json();
  }
}
