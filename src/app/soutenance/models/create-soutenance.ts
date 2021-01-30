export class CreateSoutenance  {
    
    titre: string;
    dateDePassage: Date;
    sessionId: number;
    salleId: number;
    juryId: number;
    sujetId:number
}

export class CreateSalle {
  code: string;
}


export class CreateJury   {
  president:number
  members:number[]

}

export class CreateSession  {
  dateDebut: Date;
  dateFin: Date;
  anneeId: number;
}

export class CreateAnnee   
{  
  annee: number
  
    
}

