'use strict';
var dbAdresse = 'http://localhost:15345/';
var PouchDB = require('PouchDB');



/*
var db = new PouchDB('http://127.0.0.1:5984/studenten');
db.login('admin', 'admin').then(function (batman) {
  console.log("I'm Batman.");
  return db.logout();
});*/


/**
 * @brief Some brief description.
 * @param [in|out] type parameter_name Parameter description.
 * @param [in|out] type parameter_name Parameter description.
 * @return Description of returned value.
 */
function neuerStudent(vName, nName, GebDatum, stKurs, stGeschl) {
    var locDB = new PouchDB('localDB');
    locDB.put({
        "_id": stKurs + ":" + nName + ":" + nName,
        "Vorname": vName,
        "Nachname": nName,
        "Geburtsdatum": GebDatum,
        "Geschlecht": stGeschl,
        "Kurs": stKurs,
        "Vorlesungen": []
    });
    locDB.replicate(dbAdresse + "/studentendb");
}

/**
 * @brief Some brief description.
 * @param [in|out] type parameter_name Parameter description.
 * @param [in|out] type parameter_name Parameter description.
 * @return Description of returned value.
 */
function neueVorlesung(nameKurs, vName, nName, vRaum) {
    var locDB = new PouchDB('localDB');
    locDB.put({
        "_id": nameKurs,
        "Kurs": nameKurs,
        "dozVName": vName,
        "dozNName": nName,
        "Raum": vRaum
    });
    locDB.replicate(dbAdresse + "/vorlesungendb");
}

/**
 * @brief Some brief description.
 * @param [in|out] type parameter_name Parameter description.
 * @param [in|out] type parameter_name Parameter description.
 * @return Description of returned value.
 */
function addVorlesungToStudent(studentID, vorlesungID) {
    var locDB, addVorToStd;
    locDB = new PouchDB(dbAdresse + "/studentendb");
    addVorToStd = {
        vorlesungID: {
            "Testate": []
        }
    };
    
    locDB.get(studentID).then(function (studentObjekt) {
        
        studentObjekt.Vorlesungen.push(addVorToStd);
        return locDB.put(studentObjekt);
    }).then(function (result) {
        return locDB.get(studentID);
    }).catch(function (err) {
        // Error Handling hier einfügen
    });
}

/**
 * @brief Some brief description.
 * @param [in|out] type parameter_name Parameter description.
 * @param [in|out] type parameter_name Parameter description.
 * @return Description of returned value.
 */
function addTestatToVorlStd() {
    
}

/**
 * @brief Some brief description.
 * @param [in|out] type parameter_name Parameter description.
 * @param [in|out] type parameter_name Parameter description.
 * @return Description of returned value.
 */
function addH2BewToTestat(studentID, testatID, bewName, H2Val, benchmark, impact, score) {
    var newH2Bew, locDB;
    locDB = new PouchDB(dbAdresse + "/studentendb");
    
    newH2Bew = {
        bewName: {
            "Impact": impact,
            "H2BewertungDOWN": H2Val,
            "Score": score,
            "Rate": berechneS2R(benchmark, score, impact)
        }
    };
    
    locDB.get(studentID).then(function (studentObjekt) {
        
        studentObjekt.Vorlesungen[testatID].push(addVorToStd);
        return locDB.put(studentObjekt);
    }).then(function (result) {
        return locDB.get(studentID);
    }).catch(function (err) {
        // Error catching student object
    });
}

function addRateBewToTestat(testatID) {}

/**
 * @brief Berechnet aus einem Score einen Rate Wert.
 * @param [in] benchmark    Benchmark.
 * @param [in] score        Score.
 * @param [in] impact       Gewichtung des Scores in den Rate.
 * @return Gibt den RefiningInversen zurück (Rate).
 */
function berechneS2R(benchmark, score, impact) {
    var refInvOp1, refInvOp2, refInvWert = 0;
    
    if (impact === 0 || benchmark === 0 || benchmark === 1) {
        refInvWert = 1;
        if (impact !== 0 && benchmark !== 0 && benchmark !== 1 && score < (benchmark / (1 - impact * (1 - benchmark)))) {
            refInvOp1 = Math.log(1 - (score / benchmark) * (1 - impact * (1 - benchmark)));
            refInvOp2 = Math.log(impact * (1 - benchmark));
            refInvWert = refInvOp1 / refInvOp2;
        }
    }
    if (impact !== 0 && benchmark !== 0 && benchmark !== 1 && score >= (benchmark / (1 - impact * (1 - benchmark)))) {
        // Errorhandling!
    }
    return refInvWert;
}

/**
 * @brief Berechnet alle Rates zu einem Score.
 * @param [in] Impact der Rates.
 * @param [in] Rate.
 * @param [in] Aktueller Score welcher mit einberechnet wird.
 * @return Gibt den Score zurück
 */
function berechneAlleR2S(impact, rate, scoreAktuell) {
    var zaehlerS2R, nennerS2R;
    zaehlerS2R = ((1 - Math.pow(impact * (1 - scoreAktuell), rate)));
    nennerS2R = (1 - (impact * (1 - scoreAktuell)));
    
    return (zaehlerS2R / nennerS2R) * scoreAktuell;
}

/**
 * @brief Some brief description.
 * @param [in|out] type parameter_name Parameter description.
 * @param [in|out] type parameter_name Parameter description.
 * @return Description of returned value.
 */
function rechneR2Szusammen(studentObjekt, vorlesung, testat) {
    var aktGesWert, impactBew, rateBew;
    aktGesWert = studentObjekt.Vorlesungen[vorlesung].Testate[testat].Gesamtbewertung;
    
    if (aktGesWert !== null) {
        for (i = 0; i < studentObjekt.Vorlesungen[vorlesung].Testate[testat].Bewertungen.length; i += 1) {
            impactBew = studentObjekt.Vorlesungen[vorlesung].Testate[testat].Bewertungen[i].Impact;
            rateBew = studentObjekt.Vorlesungen[vorlesung].Testate[testat].Bewertungen[i].Rate;
            aktGesWert = berechneAlleR2S(impactBew, rateBew, aktGesWert);
        }
        studentObjekt.Vorlesungen[vorlesung].Testate[testat].Gesamtbewertung = aktGesWert;
        return true;
    } else {
        return false;
    }
}

function addTestat(titel) {
}

function getStudent(vName, nName, stdKurs){
  
}