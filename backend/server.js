import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Sequelize, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';
import jwt from 'jwt-simple';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = '60e08c0c7e5845579203ce3b34b2a48aaa4f74ac2ceb3f8e840b94f15e31959aeeaf326b0ba4aa2a739bd03afb61da16376c53986e27b63b56f677c05f1670ce'; // Reemplaza esto con la clave secreta generada

// Configurar CORS de forma genérica
app.use(cors({
  origin: '*',
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization'
}));

// Crear la carpeta uploads si no existe
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(uploadDir));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite'
});

const User = sequelize.define('User', {
  nombreCompleto: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correoElectronico: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profesion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  servicios: {
    type: DataTypes.STRING,
    allowNull: false
  },
  perfilImage: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'usuario'
  }
});

sequelize.sync();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Endpoint para registrar usuario
app.post('/api/register', upload.single('perfilImage'), async (req, res) => {
  try {
    const { nombreCompleto, correoElectronico, contraseña, direccion, telefono, profesion, servicios, rol } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const perfilImage = req.file ? `/uploads/${req.file.filename}` : null;

    const user = await User.create({
      nombreCompleto,
      correoElectronico,
      contraseña: hashedPassword,
      direccion,
      telefono,
      profesion,
      servicios,
      perfilImage,
      rol
    });

    res.json(user);
  } catch (error) {
    res.status(500).send('Error al registrar usuario');
  }
});

// Endpoint para inicio de sesión
app.post('/api/login', async (req, res) => {
  try {
    const { correoElectronico, contraseña } = req.body;
    const user = await User.findOne({ where: { correoElectronico } });

    if (!user) {
      console.log(`Usuario no encontrado: ${correoElectronico}`);
      return res.status(401).send('Correo electrónico o contraseña incorrectos');
    }

    const isMatch = await bcrypt.compare(contraseña, user.contraseña);
    if (!isMatch) {
      console.log(`Contraseña incorrecta para el usuario: ${correoElectronico}`);
      return res.status(401).send('Correo electrónico o contraseña incorrectos');
    }

    const payload = { id: user.id, correoElectronico: user.correoElectronico, rol: user.rol };
    const token = jwt.encode(payload, SECRET_KEY);
    res.json({ token, rol: user.rol });
  } catch (error) {
    res.status(500).send('Error al iniciar sesión');
  }
});

// Middleware para verificar token y rol
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send('Token no proporcionado');
  }

  try {
    const decoded = jwt.decode(token, SECRET_KEY);
    req.userId = decoded.id;
    req.userRol = decoded.rol;
    next();
  } catch (error) {
    res.status(401).send('Token inválido');
  }
};

// Endpoint protegido de ejemplo
app.get('/api/protected', verifyToken, (req, res) => {
  if (req.userRol !== 'admin') {
    return res.status(403).send('Acceso denegado');
  }
  res.send('Contenido protegido solo para administradores');
});

// Endpoint para obtener perfil de usuario
app.get('/api/profile/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al obtener el perfil del usuario');
  }
});

// Endpoint para buscar usuarios por nombre
app.get('/api/users', async (req, res) => {
  try {
    const { search } = req.query;
    const users = await User.findAll({
      where: {
        nombreCompleto: {
          [Sequelize.Op.like]: `%${search}%`
        }
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).send('Error al buscar usuarios');
  }
});

// Endpoint para obtener lista de usuarios y realizar búsqueda
app.get('/api/users', async (req, res) => {
  try {
    const { search } = req.query;
    let users;
    if (search) {
      users = await User.findAll({
        where: {
          [Op.or]: [
            { nombreCompleto: { [Op.like]: `%${search}%` } },
            { profesion: { [Op.like]: `%${search}%` } },
            { servicios: { [Op.like]: `%${search}%` } }
          ]
        }
      });
    } else {
      users = await User.findAll();
    }
    res.json(users);
  } catch (error) {
    res.status(500).send('Error al obtener los usuarios');
  }
});

// Endpoint para actualizar perfil de usuario
app.put('/api/profile/:id', upload.single('perfilImage'), async (req, res) => {
  try {
    const { nombreCompleto, correoElectronico, direccion, telefono, profesion, servicios } = req.body;
    const perfilImage = req.file ? `/uploads/${req.file.filename}` : null;

    const user = await User.findByPk(req.params.id);
    if (user) {
      user.nombreCompleto = nombreCompleto;
      user.correoElectronico = correoElectronico;
      user.direccion = direccion;
      user.telefono = telefono;
      user.profesion = profesion;
      user.servicios = servicios;
      if (perfilImage) user.perfilImage = perfilImage;

      await user.save();
      res.json(user);
    } else {
      res.status(404).send('Usuario no encontrado');
    }
  } catch (error) {
    res.status(500).send('Error al actualizar el perfil del usuario');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
