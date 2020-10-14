import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  res.send({
    status: "ok",
  });
};
