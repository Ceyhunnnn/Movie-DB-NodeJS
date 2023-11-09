class Response {
  constructor(data = null, message = null) {
    this.data = data;
    this.message = message;
  }
  success = (res) => {
    res.status(200).json({
      success: true,
      data: this.data,
      message: this.message ?? "Successfull",
    });
  };
  created = (res) => {
    res.status(201).json({
      success: true,
      data: this.data,
      message: this.message ?? "Created",
    });
  };

  error500 = (res) => {
    res.status(500).json({
      success: false,
      data: this.data,
      message: this.message ?? "Error",
    });
  };
  error400 = (res) => {
    res.status(400).json({
      success: false,
      data: this.data,
      message: this.message ?? "Error",
    });
  };
  error401 = (res) => {
    res.status(401).json({
      success: false,
      data: this.data,
      message: this.message ?? "Auth Error",
    });
  };
  error404 = (res) => {
    res.status(404).json({
      success: false,
      data: this.data,
      message: this.message ?? "Error",
    });
  };
  error429 = (res) => {
    res.status(429).json({
      success: false,
      data: this.data,
      message: this.message ?? "Api Call Error",
    });
  };
}

module.exports = Response;
