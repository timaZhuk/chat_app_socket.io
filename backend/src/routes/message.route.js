import express from "express";

const router = express.Router();

//--send message
router.get("/send", (req, res) => {
  res.send("Send message endpoint");
});

//---

export default router;
