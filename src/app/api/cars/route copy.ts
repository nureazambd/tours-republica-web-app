// src/app/api/cars/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Car from "@/models/Car";

export async function GET(req: Request) {
  await connectDB();

  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  const min = Number(url.searchParams.get("min") || 0);
  const max = Number(url.searchParams.get("max") || 9999999);
  const sort = url.searchParams.get("sort") || "price-asc";

  const filter: any = {
    price: { $gte: min, $lte: max },
  };

  if (q) {
    const re = new RegExp(q, "i");
    filter.$or = [{ name: re }, { type: re }, { brand: re }, { model: re }];
  }

  let cursor = Car.find(filter);

  if (sort === "price-asc") cursor = cursor.sort({ price: 1 });
  else if (sort === "price-desc") cursor = cursor.sort({ price: -1 });
  else if (sort === "rating") cursor = cursor.sort({ rating: -1 });

  const cars = await cursor.limit(200).lean();
  return NextResponse.json(cars);
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();
    const car = await Car.create(data);
    return NextResponse.json(car, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
