SELECT [RegisteredTime].*,  
               DATEDIFF(HH, [RegisteredTime].Starts, [RegisteredTime].Ends) [Duration],  
               [Project].Name AS [ProjectName]  
               FROM [RegisteredTime]  
               LEFT JOIN [Project] ON  
               [Project].ID = [RegisteredTime].ProjectId  
               AND [Project].Deleted = 0  
               WHERE [RegisteredTime].Starts = '1/1/2023 12:00:00 AM'  
               AND [RegisteredTime].Ends = '1/13/2023 12:00:00 AM'  
               AND [RegisteredTime].Deleted = 0 