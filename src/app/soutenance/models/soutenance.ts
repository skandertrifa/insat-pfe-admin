import { Enseignant } from "src/app/models/enseignant";
import { TimeStamp } from "src/app/models/timeStamp";


export class Soutenance extends TimeStamp{
    
    id: number;
    titre: string;
    dateDePassage: Date;
    session: Session;
    salle: Salle;
    jury: Jury;
    sujet:Sujet
}

export class Salle extends TimeStamp {
  id: number;
  code: string;
}

export class Sujet extends TimeStamp{
  
  id: number;
  titre: string;
  dateLimiteDepot: Date;
  description: string;
  rapportPfe:RapportPfe

}

export class RapportPfe extends TimeStamp{
  id: number;
  path: string;
}


export class Jury extends TimeStamp {
  id:number
  president:Enseignant
  members:Enseignant[]

}

export class Session extends TimeStamp{
  id: number;
  dateDebut: Date;
  dateFin: Date;
  annee: Annee;
  
}

export class Annee  extends TimeStamp
{  
    id: number;
    annee: number

}

