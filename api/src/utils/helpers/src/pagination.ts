import { Errors } from "@tools/errors";
import { CursorParam } from "@tools/types";
import { atob } from "./atob";
import { btoa } from "./btoa";

export class Pagination {
  entity: ClassDecorator;
  constructor(entity: any) {
    this.entity = entity;
  }

  getEntityPropertyType = (key: string): string => {
    return Reflect.getMetadata(
      "design:type",
      this.entity.prototype,
      key
    ).name.toLowerCase();
  };

  decodeByType(type: string, value: string): string | number | Date {
    switch (type) {
      case "date":
        const timestamp = parseInt(value, 10);
        if (Number.isNaN(timestamp))
          throw new Errors(
            "ConflictException",
            "Date Column in cursor should a valid timestamp"
          );
        return new Date(timestamp);
      case "number":
        const num = parseInt(value, 10);
        if (Number.isNaN(num))
          throw new Errors(
            "ConflictException",
            "Number Column in cursor should a valid number"
          );
        return num;
      case "string":
        return decodeURIComponent(value);
      default:
        throw new Errors(
          "NotFoundException",
          "Cursor pagination type doesn't exist"
        );
    }
  }

  encodeByType(type: string, value: any): string | null {
    if (value === null) return null;

    switch (type) {
      case "date": {
        return (value as Date).getTime().toString();
      }
      case "number": {
        return `${value}`;
      }
      case "string": {
        return encodeURIComponent(value);
      }
      default: {
        throw new Error(`unknown type in cursor: [${type}]${value}`);
      }
    }
  }

  decode(cursor: string): CursorParam {
    const cursors: CursorParam = {};
    const columns = atob(cursor).split(",");
    for (const col of columns) {
      const [key, raw] = col.split(":");
      const type = this.getEntityPropertyType(key);
      const value = this.decodeByType(type, raw);
      cursors[key] = value;
    }

    return cursors;
  }

  encode(entity: any, paginationKeys: string[]) {
    const payload = paginationKeys
      .map((key) => {
        const type = this.getEntityPropertyType(key);
        const value = this.encodeByType(type, entity[key]);
        return `${key}:${value}`;
      })
      .join(",");

    return btoa(payload);
  }
}
