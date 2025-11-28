import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm";
import { Permission } from "./permission.entity";

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Permission)
    @JoinTable()
    permissions: Permission[] // lista de permisos para este rol
}

/*
✅ ¿Qué hace eager: true?
Cuando pones eager: true en una relación de TypeORM, le dices:

"Cada vez que cargues este objeto (por ejemplo, un Usuario), ¡carga automáticamente su Rol junto con él!"

Sin necesidad de hacer una consulta extra.
*/