import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("Cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function createEditCabin({ newCabin, id }) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = hasImagePath
    ? null
    : `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/Cabin_images/${imageName}`;

  let query = supabase.from("Cabins");

  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be Created");
  }

  if (hasImagePath) return data;

  const { error: stroageError } = await supabase.storage
    .from("Cabin_images")
    .upload(imageName, newCabin.image);

  if (stroageError) {
    if (!id) await supabase.from("Cabins").delete().eq("id", data.id);
    console.error(stroageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not Created",
    );
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("Cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
