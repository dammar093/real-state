import { Request, Response } from "express";
import AsyncHandler from "../../utils/asyncHandler";

class PropertyController extends AsyncHandler {

  // create property -> property should created by admin and super admin
  async createProperty(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }
  //get all property -> it should have pagination and scolling
  async getAllProperty(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }

  // get property by id 
  async getAllPropertyBtId(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }

  // search property -> search must have -> price, location, description, service and title
  async searchProperty(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }
  // sort property -> price high to low or low to high vice versa implement algorith here
  async sortProperty(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }
  // edit property -> don't allow to edit image
  async editProperty(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }
  // delete property -> should have soft delete
  async deleteProperty(req: Request, res: Response): Promise<void> {
    try {

    } catch (error) {

    }
  }
}