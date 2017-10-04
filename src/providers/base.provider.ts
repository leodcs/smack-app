import { Response } from "@angular/http";


export abstract class BaseProvider {
  protected extractData(res: Response) {
    return res.json();
  }
  protected extractError(error: Response | any): string {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);

    return errMsg;
  }
}
