const campingErrors = {
  notFound: new Error("Camping not found"),
  cantCreate: new Error("Can't create camping"),
  inscriptionForWorkTeamIsAllReadyOpen: new Error(
    "Inscription for work team is not open"
  ),
  inscriptionForCamperIsAllReadyOpen: new Error(
    "Inscription for camper is allready open"
  ),
  inscriptionForWorkTeamIsAllReadyClose: new Error(
    "Inscription for work team is allready close"
  ),
  inscriptionForCamperIsAllReadyClose: new Error(
    "Inscription for camper is allready close"
  ),
  campingNotOpen: new Error("Camping is not open"),
  campingIsOpen: new Error("Camping is all ready open"),
};

export { campingErrors };
