//实验1程序(59LYH_2DRand.js)

var NumPoints = 60000;	//总共使用5000个点绘制Sierpinski镂垫
var points = [];		//存放顶点坐标的数组，初始为空

//页面加载完成后调用此函数，函数名任意（不一定为main）
window.onload = function main()
	{
		//获取页面中id为webgl的canvas元素
		var canvas = document.getElementById("webgl");
		if(!canvas)//获取失败？
		{
			alert("获取canvas元素失败！");
			return;
		}
		
		//利用辅助程序文件中的功能获取WebGL上下文
		//成功则后面可通过gl来调用WebGL的函数
		var gl = WebGLUtils.setupWebGL(canvas);
		if(!gl)//失败则弹出信息
		{
			alert("获取WebGL上下文失败！");
			return;
		}

		//指定颜色
		var colors = [];


		//计算并存储NumPoints个顶点坐标

		//网格直线平行x
		for(var i = 0;i < NumPoints;i++)
		{
			if(Math.random()>0.5)
				var x = Math.random();
			else
				var x = Math.random()*(-1);	
			var y1=Math.floor(Math.random() * (1- 0.5 + 1)) + 0.5;
			points.push(vec2(x,y1));	
			colors.push(vec3(1.0,1.0,1.0));
			points.push(vec2(x,-y1));	
			colors.push(vec3(1.0,1.0,1.0));
			var y3=Math.floor(Math.random() * (1- 0.0 + 1)) + 0.0;
			points.push(vec2(x,y3));	
			colors.push(vec3(1.0,1.0,1.0));
			points.push(vec2(x,-y3));	
			colors.push(vec3(1.0,1.0,1.0));			
		}
		//网格直线平行y
		for(var i = 0;i < NumPoints;i++)
		{
			if(Math.random()>0.5)
				var y = Math.random();
			else
				var y = Math.random()*(-1);	
			var x1=Math.floor(Math.random() * (1- 0.5 + 1)) + 0.5;
			points.push(vec2(x1,y));	
			colors.push(vec3(1.0,1.0,1.0));
			points.push(vec2(-x1,y));	
			colors.push(vec3(1.0,1.0,1.0));
			var x3=Math.floor(Math.random() * (1- 0.0 + 1)) + 0.0;
			points.push(vec2(x3,y));	
			colors.push(vec3(1.0,1.0,1.0));	
			points.push(vec2(-x3,y));	
			colors.push(vec3(1.0,1.0,1.0));			
		}
		
		//yellow lemon
		for(var i = 0;i < NumPoints * 10;i++)
		{
			if(Math.random()>0.5)
				var x = Math.random();
			else
				var x = Math.random()*(-1);
			if(Math.random()>0.5)
				var y = Math.random();
			else
				var y = Math.random()*(-1);
			
			
			if((((x-0.4)*(x-0.4)) + ((y-0.4)*(y-0.4)) <= 0.08 && ((x-0.4)*(x-0.4)) + ((y-0.4)*(y-0.4)) >= 0.06)
				||(((x+0.4)*(x+0.4)) + ((y+0.4)*(y+0.4)) <= 0.08 && ((x+0.4)*(x+0.4)) + ((y+0.4)*(y+0.4)) >= 0.06)) //环
			{
				points.push(vec2(x,y));
				colors.push(vec3(1,0.90,0.35));
			}	

			if((((x-0.4)*(x-0.4)) + ((y-0.4)*(y-0.4)) <= 0.068)
				||(((x+0.4)*(x+0.4)) + ((y+0.4)*(y+0.4)) <= 0.068))//圆
			{
				points.push(vec2(x,y));
				colors.push(vec3(1.0,1.0,1.0));
			}		
				
			if((((x-0.4)*(x-0.4)) + ((y-0.4)*(y-0.4)) <= 0.05)
				||(((x+0.4)*(x+0.4)) + ((y+0.4)*(y+0.4)) <= 0.05))//圆
			{
				points.push(vec2(x,y));
				colors.push(vec3(1.0,0.94,0.55));
			}	
			
			if(Math.random()>0.5)  //parallel y
				var b = Math.random();
			else
				var b = Math.random()*(-1);	
			if(b>=(0.4-Math.sqrt(0.05)) && b<=(0.4+Math.sqrt(0.05)))
			{
				var a=Math.floor(Math.random() * (1- 0.4 + 1)) + 0.4;
				points.push(vec2(a,b));	
				colors.push(vec3(1.0,1.0,1.0));
				
				if(a< 0.8)
				{
					points.push(vec2(a-0.8,b-0.8));	
					colors.push(vec3(1.0,1.0,1.0));
				}
			}
			
			if(Math.random()>0.5)  //parallel x    X
				var a = Math.random();
			else
				var a = Math.random()*(-1);	
			if(a>=(0.4-Math.sqrt(0.05)) && a<=(0.4+Math.sqrt(0.05)))
			{
				var b=Math.floor(Math.random() * (1- 0.4 + 1)) + 0.4;
				points.push(vec2(a,b));	
				colors.push(vec3(1.0,1.0,1.0));
				if(b < 0.8)
				{
					points.push(vec2(a-0.8,b-0.8));	
					colors.push(vec3(1.0,1.0,1.0));
				}
			}
			if(a>=(0.4- Math.sqrt(0.05 / 2)) && a<=(0.4+Math.sqrt(0.05 / 2)))
			{
				var b = -a + 0.4 * 2;
				points.push(vec2(a,a));	
				colors.push(vec3(1.0,1.0,1.0));
				
				points.push(vec2(a,b));	
				colors.push(vec3(1.0,1.0,1.0));
				if(b < 0.8 && a < 0.8)
				{
					points.push(vec2(a-0.8,a-0.8));	
					colors.push(vec3(1.0,1.0,1.0));
					points.push(vec2(a-0.8,b-0.8));	
					colors.push(vec3(1.0,1.0,1.0));
				}
			}
		}
		
		//green lemon
		for(var i = 0;i < NumPoints * 10;i++)
		{
			if(Math.random()>0.5)
				var x = Math.random();
			else
				var x = Math.random()*(-1);
			if(Math.random()>0.5)
				var y = Math.random();
			else
				var y = Math.random()*(-1);
			
			
			if((((x-0.4)*(x-0.4)) + ((y+0.4)*(y+0.4)) <= 0.08 && ((x-0.4)*(x-0.4)) + ((y+0.4)*(y+0.4)) >= 0.06)
				||(((x+0.4)*(x+0.4)) + ((y-0.4)*(y-0.4)) <= 0.08 && ((x+0.4)*(x+0.4)) + ((y-0.4)*(y-0.4)) >= 0.06))//环
			{
				points.push(vec2(x,y));
				colors.push(vec3(0.56,0.76,0.22));
				
			}	

			if((((x-0.4)*(x-0.4)) + ((y+0.4)*(y+0.4)) <= 0.068)
				||(((x+0.4)*(x+0.4)) + ((y-0.4)*(y-0.4)) <= 0.068))//圆
			{
				points.push(vec2(x,y));
				colors.push(vec3(1.0,1.0,1.0));
			}		
				
			if((((x-0.4)*(x-0.4)) + ((y+0.4)*(y+0.4)) <= 0.05)
				||(((x+0.4)*(x+0.4)) + ((y-0.4)*(y-0.4)) <= 0.05))//圆
			{
				points.push(vec2(x,y));
				colors.push(vec3(0.76,0.85,0.39));
			}	
			
			if(Math.random()>0.5)  //parallel y
				var b = Math.random();
			else
				var b = Math.random()*(-1);	
			if(b>=(0.4-Math.sqrt(0.05)) && b<=(0.4+Math.sqrt(0.05)))
			{
				var a=Math.floor(Math.random() * (1- 0.4 + 1)) + 0.4;
			
				points.push(vec2(a,b-0.8));	
				colors.push(vec3(1.0,1.0,1.0));
				if(a< 0.8)
				{
					points.push(vec2(a-0.8,b));	
					colors.push(vec3(1.0,1.0,1.0));
				}
			}
			
			if(Math.random()>0.5)  //parallel x    X
				var a = Math.random();
			else
				var a = Math.random()*(-1);	
			if(a>=(0.4-Math.sqrt(0.05)) && a<=(0.4+Math.sqrt(0.05)))
			{
				var b=Math.floor(Math.random() * (1- 0.4 + 1)) - 0.4;
				if(b<0)
				{
					points.push(vec2(a,b));	
					colors.push(vec3(1.0,1.0,1.0));
					
				}
				if(b > -0.8)
				{
					points.push(vec2(a-0.8,b+0.8));	
					colors.push(vec3(1.0,1.0,1.0));
				}
			}
			if(a>=(0.4- Math.sqrt(0.05 / 2)) && a<=(0.4+Math.sqrt(0.05 / 2)))
			{
				var b = a - 0.8;
				points.push(vec2(a,b));	
				colors.push(vec3(1.0,1.0,1.0));
				points.push(vec2(a,-a));	
				colors.push(vec3(1.0,1.0,1.0));
				points.push(vec2(a-0.8,b+0.8));	
				colors.push(vec3(1.0,1.0,1.0));//13
				points.push(vec2(a-0.8,-a+0.8));	
				colors.push(vec3(1.0,1.0,1.0));//24
			}
		}
		
		//四角
		for(var i = 0;i < NumPoints * 12;i++)
		{
			if(Math.random()>0.5)
				var x = Math.random();
			else
				var x = Math.random()*(-1);
			if(Math.random()>0.5)
				var y = Math.random();
			else
				var y = Math.random()*(-1);
			
			
			if((x * x) + (y * y) >= 1.6)
			{
				points.push(vec2(x,y));
				colors.push(vec3(1.0,1.0,1.0));
			}
		}
		
		
		
		
		//设置WebGL相关属性
		//设置视口（此处视口占满整个canvas）
		gl.viewport(0,//视口左边界距离canvas左边界距离
					0,//视口下边界距离canvas上边界距离
					canvas.width,//视口宽度
					canvas.height);//视口高度
		gl.clearColor(1.0,0.82,0.78,1.0);//设置背景色为白色
		
		//加载shader程序并为shader中attribute变量提供数据
		//加载id分别为"vertex-shader"和"fragment-shader"的shader程序
		//并进行编译和链接，返回shader程序对象program
		var program = initShaders(gl,"vertex-shader","fragment-shader")	;
		gl.useProgram(program);	//启用该shader程序对象
		
		//将顶点属性数据传输到GPU
		var verticesBufferId = gl.createBuffer();//创建buffer
		//将id为verticesBufferId的buffer绑定为当前Array Buffer
		gl.bindBuffer(gl.ARRAY_BUFFER,verticesBufferId);
		//为当前Array Buffer提供数据，传输到GPU
		gl.bufferData(gl.ARRAY_BUFFER,	//Buffer类型
				flatten(points),		//Buffer数据来源，flatten将points转换为GPU可接受的格式
				gl.STATIC_DRAW);		//表明将如何使用Buffer（STATIC_DRAW表明是一次提供数据，多遍绘制）
		
		//为shader属性变量与buffer数据建立关联
		//获取名称为"a_Position"的shader attribute变量的位置
		var a_Position = gl.getAttribLocation(program,"a_Position");
		if(a_Position < 0)//getAttribLocation获取失败则返回-1
		{
			alert("获取attribute变量a_Position失败！");
			return;
		}
		
		//指定利用当前Array Buffer为a_Position提供数据具体方式
		gl.vertexAttribPointer(a_Position,//shader attribute变量位置
			2,			//每个顶点属性有2个分量
			gl.FLOAT,	//数组数据类型（浮点型）
			false,		//不进行归一化处理
			0,			//相邻顶点属性地址相差0个字节
			0);			//第一个顶点属性在Buffer中偏移量为0字节
		gl.enableVertexAttribArray(a_Position);//启用顶点属性数组	
		
		//将顶点颜色属性数据传输到GPU
		var colorsBufferId = gl.createBuffer();//创建buffer
		//将id为colorsBufferIdd的buffer绑定为当前Array Buffer
		gl.bindBuffer(gl.ARRAY_BUFFER,colorsBufferId);
		//为当前Array Buffer提供数据，传输到GPU
		gl.bufferData(gl.ARRAY_BUFFER,//Buffer类型
			flatten(colors),	//Buffer数据来源，flatten将colors转换为GPU可接受的格式
			gl.STATIC_DRAW);//表明将如何使用Buffer（STATIC_DRAW表明是一次提供数据，多遍绘制）
		
		//为shader属性变量与buffer数据建立关联
		//获取名称为"a_Color"的shader attribute变量的位置
		var a_Color = gl.getAttribLocation(program,"a_Color");
		if(a_Color < 0)//getAttribLocation获取失败则返回-1
		{
			alert("获取attribute变量a_Color失败！");
			return;
		}
		//指定利用当前Array Buffer为a_Position提供数据具体方式
		gl.vertexAttribPointer(a_Color,//shader attribute变量位置
			3,			//每个顶点属性有2个分量
			gl.FLOAT,	//数组数据类型（浮点型）
			false,		//不进行归一化处理
			0,			//相邻顶点属性地址相差0个字节
			0);			//第一个顶点属性在Buffer中偏移量为0字节
		gl.enableVertexAttribArray(a_Color);//启用顶点属性数组		
		
		//进行绘制
		render(gl);
	};
	
//绘制函数，参数为WebGL上下文
function render(gl)
{
	gl.clear(gl.COLOR_BUFFER_BIT);//用背景色擦除窗口内容
	//使用顶点数组进行绘制
	gl.drawArrays(gl.POINTS,//绘制图元类型为点
			0,	//从第0个顶点属性数据开始绘制
			points.length);	//使用顶点个数等于顶点数组长度




}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	