````mermaid
stateDiagram-v2
    direction LR
  
    %% Define the state with a safe ID to avoid keyword conflicts
    ScalePhase : Scale
  
    %% Initial state upon submission
    [*] --> Idea : Innovator Submits Project

    %% Stage transitions requiring Official authorization
    Idea --> Prototype : Authenticated Official verifies working prototype
    Prototype --> Pilot : Authenticated Official approves pilot phase
    Pilot --> ScalePhase : Authenticated Official confirms scalable architecture
    ScalePhase --> Implemented : Authenticated Official verifies active civic deployment
  
    %% Final state
    Implemented --> [*]

    %% Note for clarity on access control
    note right of Idea
      Only users with the 'official' or 
      'super_admin' role can trigger 
      forward stage transitions.
    end note
````
