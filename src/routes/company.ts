import { Router, Request, Response } from "express";

const router = Router();

router.post("/create", (req: Request, res: Response) => {
  console.log("req company", req.body);
  res.send({
    status: "comp ok",
  });
});

export default router;
