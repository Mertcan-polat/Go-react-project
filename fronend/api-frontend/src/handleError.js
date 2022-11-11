const handleError = (response) => {
  if (response.ok) return response.json();
  else
    return response.text().then((error) => {
      throw { message: error, status: response.status };
    });
};

export default handleError;
