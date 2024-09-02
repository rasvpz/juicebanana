export const indianDate = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
export const toDayDate = indianDate?.split(',')[0]?.trim()
export const orderedTime = indianDate?.split(',')[1]?.trim()