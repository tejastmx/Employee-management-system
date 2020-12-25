const router = require("express").Router();
const infoSchema = require("../model/infomodel");

router.get("/info", (req, res) => {
  // res.send("hello from rnfo route");
  infoSchema.find((err, info) => {
    if (err) {
      res.status(404).send("error occured while fetching info");
    } else {
      res.send(info);
    }
  });
});

router.post("/info", (req, res) => {
  // res.send("hello from rnfo post");
  {
    var info = new infoSchema(req.body);
    info
      .save()
      .then((info) => res.send(info))
      .catch((err) =>
        res.status(400).send("error occured while posting info", +err)
      );
  }
});

router.get("/info/:id", (req, res) => {
  infoSchema.findOne({ _id: req.params.id }, (err, info) => {
    if (err) {
      res.status(404).send("error occured while fetching info", +err);
    } else {
      res.send(info);
    }
  });
});

router.put("/info/:id", (req, res) => {
  // if (
  //   (req.body.name = "" || req.body.email == "" || req.body.occupation == "")
  // ) {
  //   res.status(404).send("please enter details");
  // } else {
  //   var info = {
  //     name: req.body.name,
  //     occupation: req.body.occupation,
  //     email: req.body.email,
  //     date: req.body.date,
  //   };

  //   infoSchema.updateOne({ _id: req.params.id }, info, (err, data) => {
  //     if (err) {
  //       res.status(500).send("error occured while updating information");
  //     } else {
  //       res.send(data);
  //     }
  //   });
  // }

  let user = req.body;
  infoSchema.updateOne({ _id: req.params.id }, user, (err, data) => {
    if (err) res.status(500).send("error occured while updating");
    else res.send(data);
  });
});

router.delete("/info/:id", (req, res) => {
  infoSchema.deleteOne({ _id: req.params.id }, (err, info) => {
    if (err) {
      res.status(404).send("error occured while deleting info");
    } else {
      res.send(`${req.params.id} deleted`);
    }
  });
});

module.exports = router;
