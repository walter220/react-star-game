import React, { Component } from 'react';
import Game from './Components/Game';

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Game />
                    </div>
                </div>
                <br />
                <div className="modal fade" id="rules" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Spelregels</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <h6>Doel</h6>
                                <p>
                                    Het doel van het spel is om alle cijfers te gebruiken.
                                    De som van de cijfers moet overeenkomen met het aantal sterren dat is gegeven.
                                    <br/>
                                </p>

                                <h6>Het spel</h6>
                                <p>
                                    Je mag maximaal 10x om een nieuwe set sterren vragen. <br/>
                                    Wanneer je cijfers hebt aangegeven controlleer je je antwoord door op de plus te klikken.
                                    Wanneer het antwoord goed is druk je nogmaals op de plus,
                                    hierdoor komt een nieuwe set sterren en wordt het cijfer gemakeerd als gebruikt. <br/>
                                </p>
                                
                                <h6>Einde van het spel</h6>
                                <p>
                                    Wanneer het antwoord fout is kan je je cijfercombinatie aanpassen en opnieuw controleren.
                                    Wanneer alle cijfers zijn gemakeerd als gebruikt hebt je gewonnen. <br/>
                                    Wanneer je alle herkansingen hebt gebruikt en er geen mogelijkheden meer zijn heb je verloren.
                                    De knop reset game laat je altijd een volledig nieuw spel starten.
                                </p>
                                <h6>Veel plezier!</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
