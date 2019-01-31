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



/****** Object:  StoredProcedure [dbo].[USP_AddOrder]    Script Date: 2/01/2019 1:28:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_AddOrder] 	
	@Email					NVARCHAR (50),
	@PayStatus				BIT,
	@OrderTime				DATETIME
AS

	SET NOCOUNT OFF;
	
	BEGIN
		SET DATEFORMAT DMY;

		INSERT INTO [ORDER] ([email], [payStatus], [orderTime]) VALUES (								
									@Email,
									@PayStatus,									
									@OrderTime
									)

		SELECT SCOPE_IDENTITY()
	
	END
GO


/****** Object:  StoredProcedure [dbo].[USP_AddOrderItem]    Script Date: 2/01/2019 1:28:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_AddOrderItem]
	@ProductID				INT,
	@OrderID				INT,
	@Quantity				INT,
	@Price					DECIMAL
AS

	SET NOCOUNT OFF;
	
	BEGIN
		DECLARE @Error INT
		SET DATEFORMAT DMY;

		INSERT INTO [ORDERITEM] ([productID],[orderID],[quantity],[price]) VALUES (								
									@ProductID,
									@OrderID,
									@Quantity,
									@Price
									)

		--Capture the value of the @@ERROR environment variable.
		SELECT @Error = @@ERROR
		--Any value not equal to zero indicates an error occurred.
		IF @Error <> 0
		RETURN @Error		
	END
GO


/****** Object:  StoredProcedure [dbo].[USP_AddDeliveryAddress]    Script Date: 2/01/2019 1:28:50 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_AddDeliveryAddress] 	
	@OrderID				INT,
	@FirstName				NVARCHAR (20),
	@LastName				NVARCHAR (20),
	@Street					NVARCHAR (50),
	@City					NVARCHAR (20),
	@State					NVARCHAR (5),
	@PostCode				NVARCHAR (6),
	@PhoneNumber			NVARCHAR (15)
AS

	SET NOCOUNT OFF;
	
	BEGIN
		DECLARE @Error INT
		SET DATEFORMAT DMY;

		INSERT INTO [DELIVERYADDRESS] ([orderID],[firstName],[lastName],[street],[city],[state],[postCode],[phoneNumber]) VALUES (								
									@OrderID,
									@FirstName,
									@LastName,
									@Street,
									@City,
									@State,
									@PostCode,
									@PhoneNumber
									)

		--Capture the value of the @@ERROR environment variable.
		SELECT @Error = @@ERROR
		--Any value not equal to zero indicates an error occurred.
		IF @Error <> 0
		RETURN @Error		
	END
GO

-- =============================================
-- Author:		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	<Description,,>
-- =============================================
CREATE PROCEDURE [dbo].[USP_TOP10] 
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	truncate table TOP10SELLER
	INSERT INTO TOP10SELLER(productID, sales)
    SELECT p_top10.ProductID,Total 
	FROM
    (
        SELECT TOP 10 ProductID, SUM(quantity) AS Total
        FROM ORDERITEM 
        GROUP BY ProductID
		ORDER BY Total DESC        
    ) AS p_top10
	ORDER BY Total DESC
END
GO

-- =============================================
-- Author: Justin Liu		<Author,,Name>
-- Create date: <Create Date,,>
-- Description:	Support top 10 listing as XML
-- =============================================

CREATE PROCEDURE [dbo].[USP.TOP10XML] 
	-- Add the parameters for the stored procedure here
	
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
    SELECT A.productID,A.total,B.name,B.description,B.price,C.imageURL, D.keyword
	FROM
    (	SELECT TOP 10 ProductID, SUM(quantity) AS Total
        FROM ORDERITEM 
        GROUP BY ProductID
		ORDER BY Total DESC       
    ) AS A
	INNER JOIN PRODUCT AS B ON (A.productID = B.productID)
	INNER JOIN IMGURL AS C ON (A.productID = C.productID)
	INNER JOIN CATEGORY AS D ON (A.productID = D.productID)
	ORDER BY A.Total DESC
END
GO