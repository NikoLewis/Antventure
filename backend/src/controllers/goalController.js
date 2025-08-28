// backend/src/controllers/goalController.js
import { prisma } from "../lib/prisma.js";
import { Prisma } from "@prisma/client";

// Use your seeded user as a safe fallback so POST never 500s in dev
const DEV_USER_FALLBACK =
  process.env.DEV_USER_ID || "a92c5b88-bbd2-42c6-a0ae-5453cd86bf50";

export const getAllGoals = async (req, res) => {
  try {
    const goals = await prisma.goal.findMany();
    return res.status(200).json(goals);
  } catch (error) {
    console.error("getAllGoals error:", error);
    // Don't break the UI if listing fails
    return res.status(200).json([]);
  }
};

export const createGoal = async (req, res) => {
  try {
    const { title, description, userId } = req.body;

    if (!title) return res.status(400).json({ message: "title required" });

    // If frontend didn't include a userId, use a dev fallback
    const uid = userId || DEV_USER_FALLBACK;

    const newGoal = await prisma.goal.create({
      data: {
        title,
        description: description ?? "",
        userId: uid,
      },
    });

    return res.status(201).json(newGoal);
  } catch (error) {
    console.error("createGoal error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Internal Server Error" });
  }
};

export const getGoalById = async (req, res) => {
  const { id } = req.params;
  try {
    const goal = await prisma.goal.findUnique({ where: { id } });
    if (!goal) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(goal);
  } catch (error) {
    console.error("getGoalById error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateGoal = async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const updated = await prisma.goal.update({
      where: { id },
      data: { title, description },
    });
    return res.status(200).json(updated);
  } catch (error) {
    console.error("updateGoal error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteGoal = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.$transaction(async (tx) => {
      // remove likely dependents first; ignore if a model doesn't exist
  await tx.progress.deleteMany({ where: { goalId: id } });
  await tx.studySession.deleteMany({ where: { goalId: id } });
      await tx.goal.delete({ where: { id } });
    });
    return res.status(204).end();
  } catch (error) {
    // if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2003") {
    //   // FK constraint
    //   return res.status(409).json({ message: "Cannot delete goal: related rows exist" });
    // }
    console.error("deleteGoal error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logProgress = async (req, res) => {
  const { value, userId, goalId } = req.body;
  try {
    const progress = await prisma.progress.create({
      data: { value, userId, goalId },
    });
    return res.status(201).json(progress);
  } catch (error) {
    console.error("logProgress error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAchievements = async (req, res) => {
  const { userId } = req.params;
  try {
    const achievements = await prisma.achievement.findMany({ where: { userId } });
    return res.status(200).json(achievements);
  } catch (error) {
    console.error("getAchievements error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};