// app/season/page.js
import { redirect } from "next/navigation";
import dayjs from "dayjs";

export default function SeasonIndex() {
  const now = dayjs();
  const year = now.year();

  // get season from month
  const month = now.month() + 1;
  let season = "winter";
  if ([3, 4, 5].includes(month)) season = "spring";
  if ([6, 7, 8].includes(month)) season = "summer";
  if ([9, 10, 11].includes(month)) season = "fall";

  redirect(`/season/${year}/${season}`);
}
