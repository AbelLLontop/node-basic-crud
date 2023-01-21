import { Request, Response } from "express";
import Usuario from "../models/usuarios";

export const getUsuarios = async (req: Request, res: Response) => {
  const usuarios = await Usuario.findAll();

  res.json({ usuarios });
};
export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
  if(usuario){
      res.json(usuario);
  } else{
    res.status(404).json({
        message:`Not exist User with Id ${id}`
    })
  }
};
export const postUsuario = async (req: Request, res: Response) => {
    const { body } = req;
    try{
        const existEmail = await Usuario.findOne({
            where:{
                email:body.email
            }
        })
        if(existEmail){
            return res.status(400).send({
                message:`There is already a user with the email ${body.email}`
            });
            
        }
        const usuario = Usuario.build(body);
        await usuario.save();
        res.json(usuario);
    }catch(error:any){
        console.log(error);
        res.status(500).json({
            message:'Talk to the administrador'
        })
    }
};
export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try{
    const usuario = await Usuario.findByPk(id);
    if(!usuario){
        return res.status(400).json({
            message:`Not exist user with id ${id}`
        })
    }
    await usuario.update(body);
    res.json(usuario);
}catch(error:any){
    console.log(error);
    res.status(500).json({
        message:'Talk to the administrador'
    })
}
};

export const deleteUsuario =async (req: Request, res: Response) => {
  const { id } = req.params;
  const usuario = await Usuario.findByPk(id);
    if(!usuario){
        return res.status(400).json({
            message:`Not exist user with id ${id}`
        })
    }
    await usuario.update({estado:false});
    // await usuario.destroy();
  res.json(usuario);
};
