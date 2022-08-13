function saveNewData() {
  var file = new Blob([JSON.stringify({ data })], { type: "text/plain" });

  const saveFile = async (blob) => {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: "data.json",
        types: [
          {
            description: "Json",
            accept: { "text/plain": [".json"] },
          },
        ],
      });

      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();

      return handle;
    } catch (err) {
      console.error(err.name, err.message);
    }
  };
  saveFile(file);
}
