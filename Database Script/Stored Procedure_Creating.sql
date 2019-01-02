USE ECOMMERCE
GO
/****** Object:  StoredProcedure [dbo].[USP.GetALLCategory]    Script Date: 2/01/2019 1:28:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create PROCEDURE [dbo].[USP.GetALLCategory]     
        
AS                                                                  
BEGIN         
         SELECT keyword
        FROM CATEGORY 
		Group by keyword
END 
GO
/****** Object:  StoredProcedure [dbo].[USP.GetProductbyCategory]    Script Date: 2/01/2019 1:28:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create PROCEDURE [dbo].[USP.GetProductbyCategory]     
(    
     @keyword           VARCHAR(100)     = ''      
      )         
AS                                                                  
BEGIN         
         SELECT   A.productID,
				A.name, 
			    A.description ,  
			    A.price, 
			    B.imageURL, 
		        c.keyword
        FROM PRODUCT A left outer join IMGURL B on (A.productID=B.productID) 
		left outer join CATEGORY C on (A.productID=C.productID )
			where c.keyword like @keyword+'%'
          
END 
GO
/****** Object:  StoredProcedure [dbo].[USP.GetProductDetails]    Script Date: 2/01/2019 1:28:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
create PROCEDURE [dbo].[USP.GetProductDetails]     
(    
     @productID           VARCHAR(100)     = ''      
      )         
AS                                                                  
BEGIN         
         SELECT   A.productID,
				A.name, 
			    A.description ,  
			    A.price, 
			    B.imageURL, 
		        c.keyword
        FROM PRODUCT A left outer join IMGURL B on (A.productID=B.productID) 
		left outer join CATEGORY C on (A.productID=C.productID )
			where A.productID like @productID+'%'
          
END 
GO
