import { Request, Response, Router } from "express";

const router = Router();

const userData = [
  {id: 1, name: "Sam"},
  {id: 2, name: "Bob"},
  {id: 3, name: "Joe"},
];

const fetchUserData = (): Promise<typeof userData> => {
  return new Promise((resolve, reject) => {
    const randomNum = Math.floor(Math.random() * 10 + 1);
    setTimeout(() => {
      if(randomNum === 1) {
        reject("Error: Something went wrong!");
      } else {
        resolve(userData);
      }
    }, 1000);
  })
};

const getHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  if(!id) {
    return res.status(400).send({ message: "Id is required!" });
  }
  
  try {
    const fetchedUserData = await fetchUserData();
    let filteredUserData = fetchedUserData.filter((user) => user.id === parseInt(id));
    return res.status(200).send({ data: filteredUserData });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};

const postHandler = (req: Request, res: Response) => {
  const { name } = req.body;
  if(!name) {
    return res.status(400).send({ message: "Name is required!" });
  }

  const newUser = {
    id: userData.length + 1,
    name,
  };

  userData.push(newUser);
  return res.status(201).send({ data: newUser });
};

router.get("/users/:id", getHandler);
router.post("/users", postHandler);

export { router as userRouter };
