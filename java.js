//////////////////////Login//////////////////////////
<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Đăng Nhập</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .login-container {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px 0px #888888;
            text-align: center;
            width: 300px;
        }
        h2 {
            color: #ff3333;
            font-size: 24px;
            margin-bottom: 20px;
        }
        label {
            display: block;
            font-size: 14px;
            color: #555555;
            margin: 10px 0 5px;
        }
        input[type="text"], input[type="password"] {
            width: 100%;
            padding: 8px;
            margin: 5px 0;
            border: 1px solid #cccccc;
            border-radius: 4px;
        }
        input[type="submit"], input[type="button"] {
            background-color: #ff3333;
            color: white;
            padding: 10px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 48%;
            margin-top: 10px;
        }
        input[type="submit"]:hover, input[type="button"]:hover {
            background-color: #cc0000;
        }
        .button-group {
            display: flex;
            justify-content: space-between;
        }
        .error {
            color: red;
            font-size: 14px;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <h2>ĐĂNG NHẬP</h2>
        <form method="post">
            <label>Tên đăng nhập:</label>
            <input type="text" name="username" required>

            <label>Mật khẩu:</label>
            <input type="password" name="password" required>

            <div class="button-group">
                <input type="submit" name="action" value="Đăng nhập">
                <input type="button" value="Thoát" onclick="window.location.href='Login.jsp';">
            </div>
        </form>

        <%
            String username = request.getParameter("username");
            String password = request.getParameter("password");
            String action = request.getParameter("action");

            if ("Đăng nhập".equals(action)) {
                if ("DamBaThang-21203100054".equals(username) && "123".equals(password)) {
                    response.sendRedirect("ThemTV.jsp?username=" + java.net.URLEncoder.encode(username, "UTF-8"));
                } else {
                    out.println("<p class='error'>Bạn đã nhập sai thông tin về UserName hoặc Password</p>");
                }
            }
        %>
    </div>
</body>
</html>

/////////////////////De1_TimkiemSP//////////////////
package model;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection {
    public static Connection initializeDatabase() throws Exception {
        String jdbcURL = "jdbc:mysql://localhost:3306/qlsanpham";
        String dbUser = "root";
        String dbPassword = "";

        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(jdbcURL, dbUser, dbPassword);
    }
}
//CREATE DATABASE QLSanPham;
//USE QLSanPham;
//
//CREATE TABLE sanpham (
//    MaSP VARCHAR(10) PRIMARY KEY,
//    TenSP VARCHAR(50),
//    SoLuong INT,
//    DonGia FLOAT
//);
//
//INSERT INTO sanpham VALUES
//('SP001', 'Sản phẩm A', 12, 100000),
//('SP002', 'Sản phẩm B', 7, 150000),
//('SP003', 'Sản phẩm C', 4, 200000),
//('SP004', 'Sản phẩm D', 15, 250000),
//('SP005', 'Sản phẩm E', 6, 300000);


////////////////////////////////////////////////////
package model;

public class SanPham {
    private String maSP;
    private String tenSP;
    private int soLuong;
    private float donGia;
    private float chietKhau;

    public SanPham(String maSP, String tenSP, int soLuong, float donGia, float chietKhau) {
        this.maSP = maSP;
        this.tenSP = tenSP;
        this.soLuong = soLuong;
        this.donGia = donGia;
        this.chietKhau = chietKhau;
    }

    public String getMaSP() {
        return maSP;
    }

    public String getTenSP() {
        return tenSP;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public float getDonGia() {
        return donGia;
    }

    public float getChietKhau() {
        return chietKhau;
    }
}

///////////////////////////////////////////////////////
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;
import model.DatabaseConnection;
import model.SanPham;
import jakarta.servlet.RequestDispatcher;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLTimKiemSP", urlPatterns = {"/XLTimKiemSP"})
public class XLTimKiemSP extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLTimKiemSP</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLTimKiemSP at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
    String maSP = request.getParameter("maSP");
    List<SanPham> ketQuaTimKiem = new ArrayList<>();
    String message = null;

    try (Connection conn = DatabaseConnection.initializeDatabase()) {
        String sql = "SELECT * FROM sanpham WHERE MaSP = ?";
        PreparedStatement pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, maSP);
        ResultSet rs = pstmt.executeQuery();

        while (rs.next()) {
            String tenSP = rs.getString("TenSP");
            int soLuong = rs.getInt("SoLuong");
            float donGia = rs.getFloat("DonGia");
            float chietKhau = 0;

            if (soLuong > 10) {
                chietKhau = 0.1f * soLuong * donGia;
            } else if (soLuong > 5) {
                chietKhau = 0.05f * soLuong * donGia;
            }

            ketQuaTimKiem.add(new SanPham(maSP, tenSP, soLuong, donGia, chietKhau));
        }

        if (ketQuaTimKiem.isEmpty()) {
            message = "Không tìm thấy sản phẩm với mã: " + maSP;
        } else {
            message = "Đã tìm thấy sản phẩm"+ maSP;
        }
        
    } catch (Exception e) {
        e.printStackTrace();
        message = "Đã xảy ra lỗi trong quá trình tìm kiếm.";
    }

    request.setAttribute("message", message);
    request.setAttribute("ketQuaTimKiem", ketQuaTimKiem);
    request.getRequestDispatcher("TimKiemSP.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

////////////////////////////////////////////////
<%@ page import="java.sql.Connection, java.sql.Statement, java.sql.ResultSet" %>
<%@ page import="java.util.List, java.util.ArrayList" %>
<%@ page import="model.DatabaseConnection, model.SanPham" %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <title>Tìm kiếm sản phẩm</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        table, th, td {
            border: 1px solid black;
        }
        th, td {
            padding: 8px;
            text-align: left;
        }
    </style>
</head>
<body>
    <h1>Tìm kiếm sản phẩm</h1>

    <!-- Form tìm kiếm -->
    <form action="XLTimKiemSP" method="post">
        <label for="maSP">Nhập mã sản phẩm:</label>
        
        <input type="text" id="maSP" name="maSP" value="<%= request.getParameter("maSP") != null ? request.getParameter("maSP") : "" %>">
        <button type="submit">Tìm kiếm</button>
    </form>

    <!-- Hiển thị kết quả tìm kiếm nếu có -->
    <% String message = (String) request.getAttribute("message"); %>
<% if (message != null) { %>
    <p style="color: green;"><%= message %></p>
<% } %>

    <%
    List<SanPham> ketQuaTimKiem = (List<SanPham>) request.getAttribute("ketQuaTimKiem");
    if (ketQuaTimKiem != null && !ketQuaTimKiem.isEmpty()) {
%>
    <h2>Kết quả tìm kiếm:</h2>
    <table>
        <thead>
            <tr>
                <th>Mã SP</th>
                <th>Tên SP</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Chiết khấu</th>
            </tr>
        </thead>
        <tbody>
            <%
                for (SanPham sp : ketQuaTimKiem) {
            %>
                <tr>
                    <td><%= sp.getMaSP() %></td>
                    <td><%= sp.getTenSP() %></td>
                    <td><%= sp.getSoLuong() %></td>
                    <td><%= sp.getDonGia() %></td>
                    <td><%= sp.getChietKhau() %></td>
                </tr>
            <%
                }
            %>
        </tbody>
    </table>
<%
    }
%>


    <!-- Hiển thị danh sách toàn bộ sản phẩm -->
    <h2>Danh sách sản phẩm hiện có</h2>
    <%
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        List<SanPham> danhSachSanPham = new ArrayList<>();

        try {
            conn = DatabaseConnection.initializeDatabase();
            stmt = conn.createStatement();
            rs = stmt.executeQuery("SELECT * FROM sanpham");

            while (rs.next()) {
                String maSP = rs.getString("MaSP");
                String tenSP = rs.getString("TenSP");
                int soLuong = rs.getInt("SoLuong");
                float donGia = rs.getFloat("DonGia");
                float chietKhau = 0;

                if (soLuong > 10) {
                    chietKhau = 0.1f * soLuong * donGia;
                } else if (soLuong > 5) {
                    chietKhau = 0.05f * soLuong * donGia;
                }

                SanPham sp = new SanPham(maSP, tenSP, soLuong, donGia, chietKhau);
                danhSachSanPham.add(sp);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        }

        if (!danhSachSanPham.isEmpty()) {
    %>
        <table>
            <thead>
                <tr>
                    <th>Mã SP</th>
                    <th>Tên SP</th>
                    <th>Số lượng</th>
                    <th>Đơn giá</th>
                    <th>Chiết khấu</th>
                </tr>
            </thead>
            <tbody>
                <%
                    for (SanPham sp : danhSachSanPham) {
                %>
                    <tr>
                        <td><%= sp.getMaSP() %></td>
                        <td><%= sp.getTenSP() %></td>
                        <td><%= sp.getSoLuong() %></td>
                        <td><%= sp.getDonGia() %></td>
                        <td><%= sp.getChietKhau() %></td>
                    </tr>
                <%
                    }
                %>
            </tbody>
        </table>
    <%
        } else {
    %>
        <p>Không có sản phẩm nào trong cơ sở dữ liệu.</p>
    <%
        }
    %>
</body>
</html>
////////////////////////////////////////////////////////</SanPham></SanPham>
/////////////////////////////////De2_TimKiemSV///////////////////

package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/qlsv";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static Connection getConnection() {
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }
}


//CREATE DATABASE qlsv;
//USE qlsv;
//CREATE TABLE sinhvien (
//    MaSV VARCHAR(10) PRIMARY KEY,
//    HoTen VARCHAR(50),           
//    NgaySinh DATE,                
//    DiemTB FLOAT CHECK (DiemTB >= 0 AND DiemTB <= 10) 
//);
//INSERT INTO sinhvien (MaSV, HoTen, NgaySinh, DiemTB) VALUES
//('SV001', 'Nguyen Van A', '2000-05-10', 9.0),
//('SV002', 'Tran Thi B', '2001-03-15', 8.8),
//('SV003', 'Le Van C', '2000-07-22', 7.5),
//('SV004', 'Pham Thi D', '1999-12-12', 8.2),
//('SV005', 'Hoang Van E', '2000-01-18', 6.0);

////////////////////////////////////////
package model;

public class SinhVien {
    private String maSV;
    private String hoTen;
    private String ngaySinh;
    private float diemTB;

    public SinhVien(String maSV, String hoTen, String ngaySinh, float diemTB) {
        this.maSV = maSV;
        this.hoTen = hoTen;
        this.ngaySinh = ngaySinh;
        this.diemTB = diemTB;
    }

    public String getMaSV() {
        return maSV;
    }

    public String getHoTen() {
        return hoTen;
    }

    public String getNgaySinh() {
        return ngaySinh;
    }

    public float getDiemTB() {
        return diemTB;
    }
}

//////////////////////////////////////////////////
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;
import jakarta.servlet.RequestDispatcher;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLTimKiemSv", urlPatterns = {"/XLTimKiemSv"})
public class XLTimKiemSv extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLTimKiemSv</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLTimKiemSv at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       // processRequest(request, response);
         String maSV = request.getParameter("maSVTimKiem");

        // Khai báo các đối tượng kết nối CSDL và danh sách chứa dữ liệu
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        List<SinhVien> danhSachTimKiem = new ArrayList<>();
        String message = "";

        try {
            // Kết nối đến cơ sở dữ liệu
            conn = DatabaseConnection.getConnection();
            
            // Truy vấn tìm kiếm sinh viên theo mã
            String sql = "SELECT * FROM sinhvien WHERE MaSV = ?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, maSV);

            // Thực thi câu truy vấn
            rs = stmt.executeQuery();

            // Kiểm tra kết quả trả về
            if (rs.next()) {
                // Tạo đối tượng SinhVien và thêm vào danh sách
                do {
                    String maSVFound = rs.getString("MaSV");
                    String hoTen = rs.getString("HoTen");
                    String ngaySinh = rs.getString("NgaySinh");
                    float diemTB = rs.getFloat("DiemTB");

                    SinhVien sv = new SinhVien(maSVFound, hoTen, ngaySinh, diemTB);
                    danhSachTimKiem.add(sv);
                } while (rs.next());

                message = "Tìm thấy " + danhSachTimKiem.size() + " sinh viên với mã " + maSV;
            } else {
                message = "Không tìm thấy sinh viên có mã: " + maSV;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            message = "Lỗi kết nối cơ sở dữ liệu!";
        } finally {
            // Đóng kết nối
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        // Đưa thông tin tìm kiếm và thông báo vào request để trả về JSP
        request.setAttribute("danhSachTimKiem", danhSachTimKiem);
        request.setAttribute("message", message);

        // Chuyển hướng về trang JSP để hiển thị kết quả tìm kiếm
        RequestDispatcher dispatcher = request.getRequestDispatcher("TimKiemSv.jsp");
        dispatcher.forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
            doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

///////////////////////////////////////////////
<%@page import="java.text.DecimalFormat"%>
<%@page import="model.DatabaseConnection"%>
<%@page import="model.SinhVien"%>
<%@page import="java.util.List"%>
<%@page import="java.sql.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tìm kiếm Sinh viên</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f9f9f9;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        .message {
            margin-top: 20px;
            font-weight: bold;
        }
        .message.success {
            color: green;
        }
        .message.error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Tìm kiếm Sinh viên</h1>
    <form action="XLTimKiemSv" method="post">
        <label for="maSVTimKiem">Nhập mã sinh viên:</label>
        
        <input type="text" id="maSVTimKiem" name="maSVTimKiem" value="<%= request.getParameter("maSVTimKiem") != null ? request.getParameter("maSVTimKiem") : "" %>">
        <button type="submit">Tìm kiếm</button>
    </form>

    <% 
        // Hiển thị thông báo tìm kiếm
        String message = (String) request.getAttribute("message");
        List<SinhVien> danhSachTimKiem = (List<SinhVien>) request.getAttribute("danhSachTimKiem");

        if (message != null) { 
            String messageClass = (danhSachTimKiem != null && !danhSachTimKiem.isEmpty()) ? "success" : "error";
    %>
        <div class="message <%= messageClass %>">
            <%= message %>
        </div>
    <% } %>

   <% 
    DecimalFormat df = new DecimalFormat("#,###"); // Định dạng tiền tệ với dấu phân cách nghìn
%>

<!-- Hiển thị danh sách sinh viên tìm kiếm -->
<% if (danhSachTimKiem != null && !danhSachTimKiem.isEmpty()) { %>
<h2>Kết quả tìm kiếm</h2>
<table>
    <tr>
        <th>Mã SV</th>
        <th>Họ tên</th>
        <th>Ngày sinh</th>
        <th>Điểm trung bình</th>
        <th>Học bổng</th>
    </tr>
    <%
        for (SinhVien sv : danhSachTimKiem) {
            // Xác định học bổng dựa trên điểm trung bình
            String hocBong = "Không có học bổng";
            if (sv.getDiemTB() >= 9) {
                hocBong = "5.000.000 VNĐ";
            } else if (sv.getDiemTB() >= 8.5) {
                hocBong = "3.000.000 VNĐ";
            }
    %>
    <tr>
        <td><%= sv.getMaSV() %></td>
        <td><%= sv.getHoTen() %></td>
        <td><%= sv.getNgaySinh() %></td>
        <td><%= sv.getDiemTB() %></td>
        <td><%= hocBong %></td>
    </tr>
    <%
        }
    %>
</table>
<% } %>

<h2>Danh sách toàn bộ sinh viên</h2>
<% 
    // Khai báo các đối tượng kết nối CSDL và các danh sách chứa dữ liệu
    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;
    List<SinhVien> danhSachToanBo = new ArrayList<>();

    try {
        // Kết nối đến cơ sở dữ liệu
        conn = DatabaseConnection.getConnection(); // Đảm bảo DatabaseConnection có phương thức getConnection()
        stmt = conn.createStatement();

        // Thực thi câu truy vấn SQL để lấy toàn bộ sinh viên
        rs = stmt.executeQuery("SELECT * FROM sinhvien"); // Thay đổi từ "nhanvien" thành "sinhvien"

        // Lặp qua kết quả và thêm vào danh sách
        while (rs.next()) {
            String maSV = rs.getString("MaSV");
            String hoTen = rs.getString("HoTen");
            String ngaySinh = rs.getString("NgaySinh");
            float diemTB = rs.getFloat("DiemTB");

            // Tạo đối tượng SinhVien và thêm vào danh sách
            SinhVien sv = new SinhVien(maSV, hoTen, ngaySinh, diemTB);
            danhSachToanBo.add(sv);
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        // Đóng kết nối CSDL
        try {
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
%>

<% 
    if (danhSachToanBo != null && !danhSachToanBo.isEmpty()) {
%>
<table>
    <tr>
        <th>Mã SV</th>
        <th>Họ tên</th>
        <th>Ngày sinh</th>
        <th>Điểm trung bình</th>
        <th>Học bổng</th>
    </tr>
    <%
        for (SinhVien sv : danhSachToanBo) {
            // Xác định học bổng dựa trên điểm trung bình
            String hocBong = "Không có học bổng";
            if (sv.getDiemTB() >= 9) {
                hocBong = "5.000.000 VNĐ";
            } else if (sv.getDiemTB() >= 8.5) {
                hocBong = "3.000.000 VNĐ";
            }
    %>
    <tr>
        <td><%= sv.getMaSV() %></td>
        <td><%= sv.getHoTen() %></td>
        <td><%= sv.getNgaySinh() %></td>
        <td><%= sv.getDiemTB() %></td>
        <td><%= hocBong %></td>
    </tr>
    <%
        }
    %>
</table>
<% } else { %>
<p>Hiện tại không có dữ liệu sinh viên.</p>
<% } %>
</body>
</html>
/////////////////////////////////////////////////////////////
///////////////////////De3_TimKiemHoaDon/////////////////////////
package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
     private static final String URL = "jdbc:mysql://localhost:3306/qlhoadon";
    private static final String USER = "root";
    private static final String PASSWORD = ""; // Cập nhật mật khẩu phù hợp

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            throw new SQLException("Lỗi kết nối CSDL: " + e.getMessage(), e);
        }
    }
}
//CREATE DATABASE QLHoaDon;
//USE QLHoaDon;
//CREATE TABLE HoaDon (
//    MaHD VARCHAR(10) PRIMARY KEY,
//    MaKH VARCHAR(10),
//    NgayHD DATE,
//    SoKW INT
//);
//INSERT INTO HoaDon (MaHD, MaKH, NgayHD, SoKW) VALUES
//('HD001', 'KH001', '2024-12-01', 100),
//('HD002', 'KH002', '2024-12-02', 150),
//('HD003', 'KH003', '2024-12-03', 200),
//('HD004', 'KH004', '2024-12-04', 250),
//('HD005', 'KH005', '2024-12-05', 300);

/////////////////////////////////////////////////
package model;


public class HoaDon {
    private int maHD;
    private int maKH;
    private String ngayHD;
    private int soKW;
    
    // Constructor, getters và setters
    public HoaDon(int maHD, int maKH, String ngayHD, int soKW) {
        this.maHD = maHD;
        this.maKH = maKH;
        this.ngayHD = ngayHD;
        this.soKW = soKW;
    }
    
    public int getMaHD() {
        return maHD;
    }
    
    public void setMaHD(int maHD) {
        this.maHD = maHD;
    }
    
    public int getMaKH() {
        return maKH;
    }
    
    public void setMaKH(int maKH) {
        this.maKH = maKH;
    }
    
    public String getNgayHD() {
        return ngayHD;
    }
    
    public void setNgayHD(String ngayHD) {
        this.ngayHD = ngayHD;
    }
    
    public int getSoKW() {
        return soKW;
    }
    
    public void setSoKW(int soKW) {
        this.soKW = soKW;
    }
    
    public int getThanhTien() {
        return soKW * 2000;  // Thành tiền = Số KW * 2000
    }
}

/////////////////////////////////////////////////</SinhVien></SinhVien>
package model;
import model.DatabaseConnection;
import model.HoaDon;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet(name = "XLTimKiemHD", urlPatterns = {"/XLTimKiemHD"})
public class XLTimKiemHD extends HttpServlet {

    @Override
  
        
        protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String maHD = request.getParameter("maHD");
        List<String[]> ketQuaTimKiem = new ArrayList<>();
        String message = null;

        try (Connection conn = DatabaseConnection.getConnection()) {
            if (maHD != null && !maHD.trim().isEmpty()) {
                String sqlSearch = "SELECT * FROM hoadon WHERE MaHD = ?";
                PreparedStatement ps = conn.prepareStatement(sqlSearch);
                ps.setString(1, maHD);
                ResultSet rs = ps.executeQuery();

                while (rs.next()) {
                    String[] hoaDon = {
                        rs.getString("MaHD"),
                        rs.getString("MaKH"),
                        rs.getString("NgayHD"),
                        String.valueOf(rs.getInt("SoKW")),
                        String.valueOf(rs.getInt("SoKW") * 2000)
                    };
                    ketQuaTimKiem.add(hoaDon);
                }

                if (ketQuaTimKiem.isEmpty()) {
                    message = "Không tìm thấy mã hóa đơn: " + maHD;
                } else {
                    message = "Tìm thấy hóa đơn với mã: " + maHD;
                }
            } else {
                message = "Vui lòng nhập mã hóa đơn.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            message = "Lỗi hệ thống!";
        }

        // Gửi kết quả tìm kiếm về JSP
        request.setAttribute("ketQuaTimKiem", ketQuaTimKiem);
        request.setAttribute("message", message);
        request.getRequestDispatcher("TimKiemHD.jsp").forward(request, response);
    }


    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        // Gọi doGet để xử lý cả GET và POST request
        doGet(request, response);
    }

    @Override
    public String getServletInfo() {
        return "Servlet xử lý tìm kiếm hóa đơn";
    }
}

///////////////////////////////////////////////</>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.*, java.util.*" %>
<!DOCTYPE html>
<html>
<head>
    <title>Quản lý hóa đơn</title>
    <style>
        table {
            border-collapse: collapse;
            width: 80%;
            margin: 20px auto;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
        form {
            text-align: center;
            margin: 20px;
        }
        h1, h2 {
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>Quản lý hóa đơn</h1>

    <!-- Form tìm kiếm -->
    <form action="XLTimKiemHD" method="GET">
        <label>Nhập mã hóa đơn:</label>
       
        <input type="text" id="maHD" name="maHD" value="<%= request.getParameter("maHD") != null ? request.getParameter("maHD") : "" %>">
        <button type="submit">Tìm kiếm</button>
    </form>

    <!-- Hiển thị kết quả tìm kiếm -->
    <h2>Kết quả tìm kiếm</h2>
    <%
        List<String[]> ketQuaTimKiem = (List<String[]>) request.getAttribute("ketQuaTimKiem");
        String message = (String) request.getAttribute("message");
        if (message != null) {
    %>
        <p style="text-align: center; color: red;"><%= message %></p>
    <%
        }
        if (ketQuaTimKiem != null && !ketQuaTimKiem.isEmpty()) {
    %>
        <table>
            <tr>
                <th>Mã HĐ</th>
                <th>Mã KH</th>
                <th>Ngày HĐ</th>
                <th>Số KW</th>
                <th>Thành Tiền</th>
            </tr>
            <%
                for (String[] hd : ketQuaTimKiem) {
            %>
            <tr>
                <td><%= hd[0] %></td>
                <td><%= hd[1] %></td>
                <td><%= hd[2] %></td>
                <td><%= hd[3] %></td>
                <td><%= hd[4] %></td>
            </tr>
            <%
                }
            %>
        </table>
    <%
        }
    %>

    <!-- Hiển thị toàn bộ danh sách hóa đơn -->
    <h2>Danh sách hóa đơn</h2>
    <table>
        <tr>
            <th>Mã HĐ</th>
            <th>Mã KH</th>
            <th>Ngày HĐ</th>
            <th>Số KW</th>
            <th>Thành Tiền</th>
        </tr>
        <%
            // Kết nối cơ sở dữ liệu và hiển thị danh sách hóa đơn
            Connection conn = null;
            Statement stmt = null;
            ResultSet rs = null;
            try {
                Class.forName("com.mysql.cj.jdbc.Driver");
                conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/qlhoadon", "root", "");
                stmt = conn.createStatement();
                String sql = "SELECT * FROM hoadon";
                rs = stmt.executeQuery(sql);

                while (rs.next()) {
                    String maHD = rs.getString("MaHD");
                    String maKH = rs.getString("MaKH");
                    String ngayHD = rs.getString("NgayHD");
                    int soKW = rs.getInt("SoKW");
                    int thanhTien = soKW * 2000;
        %>
        <tr>
            <td><%= maHD %></td>
            <td><%= maKH %></td>
            <td><%= ngayHD %></td>
            <td><%= soKW %></td>
            <td><%= thanhTien %></td>
        </tr>
        <%
                }
            } catch (Exception e) {
                e.printStackTrace();
            } finally {
                if (rs != null) try { rs.close(); } catch (SQLException e) { e.printStackTrace(); }
                if (stmt != null) try { stmt.close(); } catch (SQLException e) { e.printStackTrace(); }
                if (conn != null) try { conn.close(); } catch (SQLException e) { e.printStackTrace(); }
            }
        %>
    </table>
</body>
</html>

///////////////////////////////////////
////////////////////De4_TimKiemNV/////////////////////////
package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/nhanvien";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static Connection getConnection() {
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }
}
//CREATE DATABASE nhanvien;
//USE nhanvien;
//CREATE TABLE nhanvien (
//    MaNV VARCHAR(10) PRIMARY KEY,      
//    HoTen NVARCHAR(50),               
//    HSL FLOAT,                       
//    PhuCap FLOAT                      
//);
//INSERT INTO nhanvien (MaNV, HoTen, HSL, PhuCap) VALUES
//('NV001', 'Nguyễn Văn A', 3.0, 500000),
//('NV002', 'Trần Thị B', 2.5, 300000),
//('NV003', 'Phạm Văn C', 4.0, 800000),
//('NV004', 'Lê Thị D', 3.2, 400000),
//('NV005', 'Hoàng Văn E', 2.8, 200000);

//////////////////////////////////////////////////</body>
package model;

public class NhanVien {
    private String maNV;
    private String hoTen;
    private float hsl;
    private float phuCap;
    private float tienLuong;

    public NhanVien(String maNV, String hoTen, float hsl, float phuCap, float tienLuong) {
        this.maNV = maNV;
        this.hoTen = hoTen;
        this.hsl = hsl;
        this.phuCap = phuCap;
        this.tienLuong = tienLuong;
    }

    public String getMaNV() { return maNV; }
    public String getHoTen() { return hoTen; }
    public float getHsl() { return hsl; }
    public float getPhuCap() { return phuCap; }
    public float getTienLuong() { return tienLuong; }
}

//////////////////////////////////////////
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;
import jakarta.servlet.RequestDispatcher;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
/**
 *
 * @author thang
 */
@WebServlet(name = "XLTimKiemNV", urlPatterns = {"/XLTimKiemNV"})
public class XLTimKiemNV extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLTimKiemNV</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLTimKiemNV at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
      // Get the search query parameter
          String hoTenTimKiem = request.getParameter("hoTenTimKiem");

        // Tạo danh sách chứa nhân viên tìm được
        List<NhanVien> danhSachTimKiem = new ArrayList<>();
        String message = "";

        // Kết nối đến cơ sở dữ liệu
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;

        try {
            conn = DatabaseConnection.getConnection();

            // Câu truy vấn tìm kiếm theo họ tên nhân viên
            String sql = "SELECT * FROM nhanvien WHERE HoTen LIKE ?";
            stmt = conn.prepareStatement(sql);
            stmt.setString(1, "%" + hoTenTimKiem + "%"); // Sử dụng LIKE để tìm kiếm gần đúng

            rs = stmt.executeQuery();

            // Nếu có kết quả, thêm vào danh sách
            while (rs.next()) {
                String maNV = rs.getString("MaNV");
                String hoTen = rs.getString("HoTen");
                float hsl = rs.getFloat("HSL");
                float phuCap = rs.getFloat("PhuCap");
                float tienLuong = (hsl + phuCap) * 2340000; // Tiền lương tính toán

                // Tạo đối tượng NhanVien và thêm vào danh sách tìm kiếm
                NhanVien nv = new NhanVien(maNV, hoTen, hsl, phuCap, tienLuong);
                danhSachTimKiem.add(nv);
            }

            // Kiểm tra kết quả tìm kiếm và gửi thông báo
            if (!danhSachTimKiem.isEmpty()) {
                message = "Tìm thấy " + danhSachTimKiem.size() + " nhân viên.";
            } else {
                message = "Không tìm thấy nhân viên có tên " + hoTenTimKiem + ".";
            }

        } catch (SQLException e) {
            e.printStackTrace();
            message = "Lỗi truy vấn cơ sở dữ liệu.";
        } finally {
            // Đóng kết nối CSDL
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        // Gửi kết quả tìm kiếm và thông báo về lại trang TimKiemNV.jsp
        request.setAttribute("danhSachTimKiem", danhSachTimKiem);
        request.setAttribute("message", message);
        RequestDispatcher dispatcher = request.getRequestDispatcher("TimKiemNV.jsp");
        dispatcher.forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       doGet(request, response);
      // processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

//////////////////////////////////////////////</NhanVien>
<%@page import="java.text.DecimalFormat"%>
<%@page import="model.DatabaseConnection"%>
<%@page import="model.NhanVien"%>
<%@page import="java.util.List"%>
<%@page import="java.sql.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tìm kiếm Nhân viên</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f9f9f9;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        .message {
            margin-top: 20px;
            font-weight: bold;
        }
        .message.success {
            color: green;
        }
        .message.error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Tìm kiếm Nhân viên</h1>
    <form action="XLTimKiemNV" method="post">
        <label for="hoTenTimKiem">Nhập tên nhân viên:</label>
        
        <input type="text" id="hoTenTimKiem" name="hoTenTimKiem" value="<%= request.getParameter("hoTenTimKiem") != null ? request.getParameter("hoTenTimKiem") : "" %>">
        <button type="submit">Tìm kiếm</button>
    </form>

    <% 
        // Hiển thị thông báo tìm kiếm
        String message = (String) request.getAttribute("message");
        List<NhanVien> danhSachTimKiem = (List<NhanVien>) request.getAttribute("danhSachTimKiem");

        if (message != null) { 
            String messageClass = (danhSachTimKiem != null && !danhSachTimKiem.isEmpty()) ? "success" : "error";
    %>
        <div class="message <%= messageClass %>">
            <%= message %>
        </div>
    <% } %>

   <% 
    DecimalFormat df = new DecimalFormat("#,###"); // Định dạng tiền tệ với dấu phân cách nghìn
%>

<!-- Hiển thị danh sách nhân viên -->
<% if (danhSachTimKiem != null && !danhSachTimKiem.isEmpty()) { %>
<h2>Kết quả tìm kiếm</h2>
<table>
    <tr>
        <th>Mã NV</th>
        <th>Họ tên</th>
        <th>Hệ số lương</th>
        <th>Phụ cấp</th>
        <th>Tiền lương</th>
    </tr>
    <%
        for (NhanVien nv : danhSachTimKiem) {
    %>
    <tr>
        <td><%= nv.getMaNV() %></td>
        <td><%= nv.getHoTen() %></td>
        <td><%= nv.getHsl() %></td>
        <td><%= nv.getPhuCap() %></td>
        <!-- Định dạng tiền lương -->
        <td><%= df.format(nv.getTienLuong()) %> VNĐ</td>
    </tr>
    <%
        }
    %>
</table>
<% } %>

    <h2>Danh sách toàn bộ nhân viên</h2>
    <% 
        // Khai báo các đối tượng kết nối CSDL và các danh sách chứa dữ liệu
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        List<NhanVien> danhSachToanBo = new ArrayList<>();

        try {
            // Kết nối đến cơ sở dữ liệu
            conn = DatabaseConnection.getConnection();
            stmt = conn.createStatement();

            // Thực thi câu truy vấn SQL để lấy toàn bộ nhân viên
            rs = stmt.executeQuery("SELECT * FROM nhanvien");

            // Lặp qua kết quả và thêm vào danh sách
            while (rs.next()) {
                String maNV = rs.getString("MaNV");
                String hoTen = rs.getString("HoTen");
                float hsl = rs.getFloat("HSL");
                float phuCap = rs.getFloat("PhuCap");
                float tienLuong = (hsl + phuCap) * 2340000; // Tiền lương tính toán

                // Tạo đối tượng NhanVien và thêm vào danh sách
                NhanVien nv = new NhanVien(maNV, hoTen, hsl, phuCap, tienLuong);
                danhSachToanBo.add(nv);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Đóng kết nối CSDL
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        }
    %>

    <% 
        if (danhSachToanBo != null && !danhSachToanBo.isEmpty()) {
    %>
    <table>
        <tr>
            <th>Mã NV</th>
            <th>Họ tên</th>
            <th>Hệ số lương</th>
            <th>Phụ cấp</th>
            <th>Tiền lương</th>
        </tr>
        <%
            for (NhanVien nv : danhSachToanBo) {
        %>
        <tr>
            <td><%= nv.getMaNV() %></td>
            <td><%= nv.getHoTen() %></td>
            <td><%= nv.getHsl() %></td>
            <td><%= nv.getPhuCap() %></td>
           <td><%= df.format(nv.getTienLuong()) %> VNĐ</td>
        </tr>
        <%
            }
        %>
    </table>
    <% } else { %>
    <p>Hiện tại không có dữ liệu nhân viên.</p>
    <% } %>
</body>
</html>

//////////////////////////////////////////////////////////////
///////////////////////////////De5_TimkiemTP/////////////////////</NhanVien></NhanVien>
package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/qlthuephong";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static Connection getConnection() {
        Connection conn = null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            conn = DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
        return conn;
    }
}
//CREATE DATABASE qlthuephong;
//USE qlthuephong;
//
//CREATE TABLE thuephong (
//    MaP VARCHAR(10) PRIMARY KEY,
//    MaKH VARCHAR(10),         
//    NgayDen DATE,              
//    NgayDi DATE              
//);
//INSERT INTO thuephong (MaP, MaKH, NgayDen, NgayDi) VALUES
//('P001', 'KH01', '2024-12-01', '2024-12-05'),
//('P002', 'KH02', '2024-12-02', '2024-12-06'),
//('P003', 'KH03', '2024-12-03', '2024-12-07'),
//('P004', 'KH04', '2024-12-04', '2024-12-08'),
//('P005', 'KH05', '2024-12-05', '2024-12-09');

///////////////////////////////////</body>
package model;

import java.util.Date;

public class ThuePhong {
    private String maP;
    private String maKH;
    private Date ngayDen;
    private Date ngayDi;

    public ThuePhong(String maP, String maKH, Date ngayDen, Date ngayDi) {
        this.maP = maP;
        this.maKH = maKH;
        this.ngayDen = ngayDen;
        this.ngayDi = ngayDi;
    }

    public String getMaP() {
        return maP;
    }

    public String getMaKH() {
        return maKH;
    }

    public Date getNgayDen() {
        return ngayDen;
    }

    public Date getNgayDi() {
        return ngayDi;
    }
}

////////////////////////////////////////////////</html>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;
import jakarta.servlet.RequestDispatcher;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
/**
 *
 * @author thang
 */
@WebServlet(name = "XLTimKiemTP", urlPatterns = {"/XLTimKiemTP"})
public class XLTimKiemTP extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLTimKiemTP</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLTimKiemTP at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       // processRequest(request, response);
      String maP = request.getParameter("maP");

        // Danh sách chứa các phòng tìm kiếm được
        List<ThuePhong> danhSachTimKiem = new ArrayList<>();
        String message = "";

        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;

        try {
            // Kết nối cơ sở dữ liệu
            conn = DatabaseConnection.getConnection();

            if (maP != null && !maP.isEmpty()) {
                // Tìm kiếm phòng theo mã phòng
                String sql = "SELECT * FROM thuephong WHERE MaP = ?";
                pstmt = conn.prepareStatement(sql);
                pstmt.setString(1, maP);
                rs = pstmt.executeQuery();

                // Lấy kết quả và thêm vào danh sách
                while (rs.next()) {
                    String maKH = rs.getString("MaKH");
                    Date ngayDen = rs.getDate("NgayDen");
                    Date ngayDi = rs.getDate("NgayDi");

                    ThuePhong tp = new ThuePhong(maP, maKH, ngayDen, ngayDi);
                    danhSachTimKiem.add(tp);
                }

                if (danhSachTimKiem.isEmpty()) {
                    message = "Không tìm thấy phòng với mã phòng: " + maP;
                } else {
                    message = "Đã tìm thấy " + danhSachTimKiem.size() + " phòng.";
                }
            } else {
                // Nếu không có mã phòng, lấy toàn bộ danh sách phòng
                String sql = "SELECT * FROM thuephong";
                pstmt = conn.prepareStatement(sql);
                rs = pstmt.executeQuery();

                while (rs.next()) {
                    String maPhong = rs.getString("MaP");
                    String maKH = rs.getString("MaKH");
                    Date ngayDen = rs.getDate("NgayDen");
                    Date ngayDi = rs.getDate("NgayDi");

                    ThuePhong tp = new ThuePhong(maPhong, maKH, ngayDen, ngayDi);
                    danhSachTimKiem.add(tp);
                }

                message = "Hiển thị toàn bộ phòng.";
            }

        } catch (SQLException e) {
            e.printStackTrace();
            message = "Đã xảy ra lỗi khi truy vấn cơ sở dữ liệu.";
        } finally {
            // Đóng kết nối và tài nguyên
            try {
                if (rs != null) rs.close();
                if (pstmt != null) pstmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        // Lưu thông báo và danh sách phòng vào request
        request.setAttribute("message", message);
        request.setAttribute("danhSachTimKiem", danhSachTimKiem);

        // Chuyển tiếp về trang JSP để hiển thị kết quả
        request.getRequestDispatcher("/TimKiemTP.jsp").forward(request, response);
   
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
          doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

///////////////////////////////////////////////////</ThuePhong>
<%@page import="model.DatabaseConnection"%>
<%@page import="model.ThuePhong"%>
<%@page import="java.util.List"%>
<%@page import="java.sql.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Tìm kiếm Phòng</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f9f9f9;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        .message {
            margin-top: 20px;
            font-weight: bold;
        }
        .message.success {
            color: green;
        }
        .message.error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Tìm kiếm Phòng</h1>
    <form action="XLTimKiemTP" method="post">
        <label for="maP">Nhập mã phòng:</label>
        
        <input type="text" id="maP" name="maP" value="<%= request.getParameter("maP") != null ? request.getParameter("maP") : "" %>">
        <button type="submit">Tìm kiếm</button>
    </form>

    <% 
        // Khai báo các đối tượng kết nối CSDL và danh sách chứa dữ liệu
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        List<ThuePhong> danhSachToanBo = new ArrayList<>();

        try {
            // Kết nối đến cơ sở dữ liệu
            conn = DatabaseConnection.getConnection();
            stmt = conn.createStatement();

            // Thực thi câu truy vấn SQL để lấy toàn bộ phòng
            rs = stmt.executeQuery("SELECT * FROM thuephong");

            // Lặp qua kết quả và thêm vào danh sách
            while (rs.next()) {
                String maP = rs.getString("MaP");
                String maKH = rs.getString("MaKH");
                Date ngayDen = rs.getDate("NgayDen");
                Date ngayDi = rs.getDate("NgayDi");

                // Tạo đối tượng ThuePhong và thêm vào danh sách
                ThuePhong tp = new ThuePhong(maP, maKH, ngayDen, ngayDi);
                danhSachToanBo.add(tp);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Đóng kết nối CSDL
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        }
    %>

    <% 
        // Hiển thị thông báo tìm kiếm
        String message = (String) request.getAttribute("message");
        List<ThuePhong> danhSachTimKiem = (List<ThuePhong>) request.getAttribute("danhSachTimKiem");

        if (message != null) { 
            String messageClass = (danhSachTimKiem != null && !danhSachTimKiem.isEmpty()) ? "success" : "error";
    %>
        <div class="message <%= messageClass %>">
            <%= message %>
        </div>
    <% } %>

    <% if (danhSachTimKiem != null && !danhSachTimKiem.isEmpty()) { %>
    <h2>Kết quả tìm kiếm</h2>
    <table>
        <tr>
            <th>Mã Phòng</th>
            <th>Mã Khách Hàng</th>
            <th>Ngày Đến</th>
            <th>Ngày Đi</th>
            <th>Tiền Thuê Phòng</th>
        </tr>
        <%
            for (ThuePhong tp : danhSachTimKiem) {
                long days = (tp.getNgayDi().getTime() - tp.getNgayDen().getTime()) / (1000 * 60 * 60 * 24) + 1;
                long tienThue = days * 300000; // Tiền thuê phòng
        %>
        <tr>
            <td><%= tp.getMaP() %></td>
            <td><%= tp.getMaKH() %></td>
            <td><%= tp.getNgayDen() %></td>
            <td><%= tp.getNgayDi() %></td>
            <td><%= tienThue %> VNĐ</td>
        </tr>
        <%
            }
        %>
    </table>
    <% } %>

    <h2>Danh sách tất cả các phòng</h2>
    <% 
        if (danhSachToanBo != null && !danhSachToanBo.isEmpty()) {
    %>
    <table>
        <tr>
            <th>Mã Phòng</th>
            <th>Mã Khách Hàng</th>
            <th>Ngày Đến</th>
            <th>Ngày Đi</th>
            <th>Tiền Thuê Phòng</th>
        </tr>
        <%
            for (ThuePhong tp : danhSachToanBo) {
                long days = (tp.getNgayDi().getTime() - tp.getNgayDen().getTime()) / (1000 * 60 * 60 * 24) + 1;
                long tienThue = days * 300000;
        %>
        <tr>
            <td><%= tp.getMaP() %></td>
            <td><%= tp.getMaKH() %></td>
            <td><%= tp.getNgayDen() %></td>
            <td><%= tp.getNgayDi() %></td>
            <td><%= tienThue %> VNĐ</td>
        </tr>
        <%
            }
        %>
    </table>
    <% } else { %>
    <p>Hiện tại không có dữ liệu phòng.</p>
    <% } %>
</body>
</html>

///////////////////////////////////////////////////////////
//////////////////////////////De6_timKiemCN////////////////////////////////
package Model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/qlcongnhan";
    private static final String USER = "root";
    private static final String PASSWORD = ""; // Cập nhật mật khẩu phù hợp

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            throw new SQLException("Lỗi kết nối CSDL: " + e.getMessage(), e);
        }
    }
}
//CREATE DATABASE QLCongNhan;
//USE QLCongNhan;
//
//CREATE TABLE CongNhan (
//    MaCN VARCHAR(10) PRIMARY KEY,
//    HoTen VARCHAR(100) NOT NULL,
//    GioiTinh CHAR(1) NOT NULL,
//    SoGioLamVuot INT NOT NULL
//);
//INSERT INTO CongNhan (MaCN, HoTen, GioiTinh, SoGioLamVuot) VALUES
//('CN001', 'Nguyen Van A', 'M', 45),
//('CN002', 'Tran Thi B', 'F', 25),
//('CN003', 'Le Van C', 'M', 15),
//('CN004', 'Pham Thi D', 'F', 30),
//('CN005', 'Hoang Van E', 'M', 40);

////////////////////////////////////////////////////////////</>
package Model;

public class CongNhan {
    private String maCN;
    private String hoTen;
    private String gioiTinh;
    private int soGioLamVuot;
    private int tienThuong;

    public CongNhan(String maCN, String hoTen, String gioiTinh, int soGioLamVuot) {
        this.maCN = maCN;
        this.hoTen = hoTen;
        this.gioiTinh = gioiTinh;
        this.soGioLamVuot = soGioLamVuot;
        this.tienThuong = calculateTienThuong(soGioLamVuot);
    }

    public String getMaCN() {
        return maCN;
    }

    public String getHoTen() {
        return hoTen;
    }

    public String getGioiTinh() {
        return gioiTinh;
    }

    public int getSoGioLamVuot() {
        return soGioLamVuot;
    }

    public int getTienThuong() {
        return tienThuong;
    }

    private int calculateTienThuong(int soGioLamVuot) {
        if (soGioLamVuot >= 40) return 500000;
        if (soGioLamVuot >= 30) return 300000;
        if (soGioLamVuot >= 20) return 200000;
        return 0;
    }
}

////////////////////////////////////////////////////////////</ThuePhong>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Model;
import Model.DBConnection;
import Model.CongNhan;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLTimKiemCN", urlPatterns = {"/XLTimKiemCN"})
public class XLTimKiemCN extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLTimKiemCN</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLTimKiemCN at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
           throws ServletException, IOException {
        String hoTenTimKiem = request.getParameter("hoTenTimKiem") != null ? request.getParameter("hoTenTimKiem").trim() : "";
        List<CongNhan> danhSachTimKiem = new ArrayList<>();
        List<CongNhan> danhSachToanBo = new ArrayList<>();
        String message = "";

        try (Connection conn = DBConnection.getConnection()) {
          
            String sqlToanBo = "SELECT * FROM congnhan";
            PreparedStatement stmtToanBo = conn.prepareStatement(sqlToanBo);
            ResultSet rsToanBo = stmtToanBo.executeQuery();

            while (rsToanBo.next()) {
                CongNhan cn = new CongNhan(
                    rsToanBo.getString("MaCN"),
                    rsToanBo.getString("HoTen"),
                    rsToanBo.getString("GioiTinh"),
                    rsToanBo.getInt("SoGioLamVuot")
                );
                danhSachToanBo.add(cn);
            }

            
            if (!hoTenTimKiem.isEmpty()) {
                String sqlTimKiem = "SELECT * FROM congnhan WHERE HoTen LIKE ?";
                PreparedStatement stmtTimKiem = conn.prepareStatement(sqlTimKiem);
                stmtTimKiem.setString(1, "%" + hoTenTimKiem + "%");
                ResultSet rsTimKiem = stmtTimKiem.executeQuery();

                while (rsTimKiem.next()) {
                    CongNhan cn = new CongNhan(
                        rsTimKiem.getString("MaCN"),
                        rsTimKiem.getString("HoTen"),
                        rsTimKiem.getString("GioiTinh"),
                        rsTimKiem.getInt("SoGioLamVuot")
                    );
                    danhSachTimKiem.add(cn);
                }

                if (danhSachTimKiem.isEmpty()) {
                    message = "Không tìm thấy công nhân có tên: " + hoTenTimKiem;
                } else {
                    message = "Tìm thấy công nhân có tên: " + hoTenTimKiem;
                }
            }
        } catch (Exception e) {
            message = "Lỗi khi tìm kiếm: " + e.getMessage();
        }

        request.setAttribute("message", message);
        request.setAttribute("danhSachTimKiem", danhSachTimKiem);
        request.setAttribute("danhSachToanBo", danhSachToanBo);
        request.getRequestDispatcher("TimKiemCN.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

///////////////////////////////////////////////////////////////</CongNhan>
<%@page import="Model.CongNhan"%>
<%@page import="java.util.List"%>
<%@page import="java.sql.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="Model.DBConnection"%>
<!DOCTYPE html>
<html>
<head>
    <title>Tìm kiếm Công Nhân</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f9f9f9;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        .message {
            margin-top: 20px;
            font-weight: bold;
        }
        .message.success {
            color: green;
        }
        .message.error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Tìm kiếm Công Nhân</h1>
    <form action="XLTimKiemCN" method="post">
        <label for="hoTenTimKiem">Nhập tên công nhân:</label>
      
        <input type="text" id="hoTenTimKiem" name="hoTenTimKiem" value="<%= request.getParameter("hoTenTimKiem") != null ? request.getParameter("hoTenTimKiem") : "" %>">
        <button type="submit">Tìm kiếm</button>
    </form>

    <% 
        // Kết nối cơ sở dữ liệu để lấy danh sách công nhân
        Connection conn = null;
        Statement stmt = null;
        ResultSet rs = null;
        List<CongNhan> danhSachToanBo = new ArrayList<>();
        
        try {
            conn = DBConnection.getConnection();
            stmt = conn.createStatement();
            rs = stmt.executeQuery("SELECT * FROM CongNhan");
            
            while (rs.next()) {
                CongNhan cn = new CongNhan(
                    rs.getString("MaCN"),
                    rs.getString("HoTen"),
                    rs.getString("GioiTinh"),
                    rs.getInt("SoGioLamVuot")
                );
                danhSachToanBo.add(cn);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        }
    %>

    <% 
        String message = (String) request.getAttribute("message");
        List<CongNhan> danhSachTimKiem = (List<CongNhan>) request.getAttribute("danhSachTimKiem");

        if (message != null) { 
            String messageClass = (danhSachTimKiem != null && !danhSachTimKiem.isEmpty()) ? "success" : "error";
    %>
        <div class="message <%= messageClass %>">
            <%= message %>
        </div>
    <% } %>

    <% if (danhSachTimKiem != null && !danhSachTimKiem.isEmpty()) { %>
    <h2>Kết quả tìm kiếm</h2>
    <table>
        <tr>
            <th>Mã CN</th>
            <th>Họ tên</th>
            <th>Giới tính</th>
            <th>Số giờ làm vượt</th>
            <th>Tiền thưởng</th>
        </tr>
        <%
            for (CongNhan cn : danhSachTimKiem) {
        %>
        <tr>
            <td><%= cn.getMaCN() %></td>
            <td><%= cn.getHoTen() %></td>
            <td><%= cn.getGioiTinh() %></td>
            <td><%= cn.getSoGioLamVuot() %></td>
            <td><%= cn.getTienThuong() %></td>
        </tr>
        <%
            }
        %>
    </table>
    <% } %>

    <h2>Danh sách toàn bộ công nhân</h2>
    <% 
        if (danhSachToanBo != null && !danhSachToanBo.isEmpty()) {
    %>
    <table>
        <tr>
            <th>Mã CN</th>
            <th>Họ tên</th>
            <th>Giới tính</th>
            <th>Số giờ làm vượt</th>
            <th>Tiền thưởng</th>
        </tr>
        <%
            for (CongNhan cn : danhSachToanBo) {
        %>
        <tr>
            <td><%= cn.getMaCN() %></td>
            <td><%= cn.getHoTen() %></td>
            <td><%= cn.getGioiTinh() %></td>
            <td><%= cn.getSoGioLamVuot() %></td>
            <td><%= cn.getTienThuong() %></td>
        </tr>
        <%
            }
        %>
    </table>
    <% } else { %>
    <p>Hiện tại không có dữ liệu công nhân.</p>
    <% } %>
</body>
</html>

//////////////////////////////////////////////////////
//////////////////////De7_ThemTS/////////////////////////////
package Model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    // Đảm bảo sử dụng đúng JDBC URL, username và password của cơ sở dữ liệu của bạn.
    private static final String URL = "jdbc:mysql://localhost:3306/ql_thisinh";
    private static final String USER = "root";
    private static final String PASSWORD = "";  

    public static Connection getConnection() throws SQLException {
        try {
            // Kết nối đến cơ sở dữ liệu
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            throw new SQLException("Lỗi khi tải driver MySQL: " + e.getMessage(), e);
        }
    }
}
//CREATE DATABASE QLThiSinh;
//USE QLThiSinh;
//
//CREATE TABLE ThiSinh (
//    SBD VARCHAR(10) PRIMARY KEY,  -- Số báo danh, định dạng chuỗi
//    Hoten VARCHAR(100),           -- Họ tên thí sinh, độ dài 100 ký tự
//    DiemToan DECIMAL(5,2),        -- Điểm Toán, kiểu số thực với 2 chữ số thập phân
//    DiemVan DECIMAL(5,2)          -- Điểm Văn, kiểu số thực với 2 chữ số thập phân
//);
//INSERT INTO ThiSinh (SBD, Hoten, DiemToan, DiemVan) VALUES
//('TS001', 'Nguyen Thi Lan', 8.5, 7.5),
//('TS002', 'Tran Minh Tu', 6.0, 8.0),
//('TS003', 'Le Thanh Hoa', 7.0, 6.5),
//('TS004', 'Pham Hoang Nam', 9.0, 8.5),
//('TS005', 'Hoang Mai Anh', 7.8, 8.2);

//////////////////////////////////////////////////////
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author thang
 */
public class ThiSinh {
    private String sbd;
    private String hoTen;
    private float diemToan;
    private float diemVan;

    public ThiSinh() {}

    public ThiSinh(String sbd, String hoTen, float diemToan, float diemVan) {
        this.sbd = sbd;
        this.hoTen = hoTen;
        this.diemToan = diemToan;
        this.diemVan = diemVan;
    }

    public String getSbd() {
        return sbd;
    }

    public void setSbd(String sbd) {
        this.sbd = sbd;
    }

    public String getHoTen() {
        return hoTen;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public float getDiemToan() {
        return diemToan;
    }

    public void setDiemToan(float diemToan) {
        this.diemToan = diemToan;
    }

    public float getDiemVan() {
        return diemVan;
    }

    public void setDiemVan(float diemVan) {
        this.diemVan = diemVan;
    }

    public String getKetQua() {
        return (diemToan + diemVan >= 10) ? "Đỗ" : "Trượt";
    }

    @Override
    public String toString() {
        return "ThiSinh{" +
               "sbd='" + sbd + '\'' +
               ", hoTen='" + hoTen + '\'' +
               ", diemToan=" + diemToan +
               ", diemVan=" + diemVan +
               ", ketQua='" + getKetQua() + '\'' +
               '}';
    }
}
/////////////////////////////////////////////</>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Model;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLThemTS", urlPatterns = {"/XLThemTS"})
public class XLThemTS extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLThemTS</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLThemTS at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
         String sbd = request.getParameter("SBD");
        String hoTen = request.getParameter("HoTen");
        float diemToan = Float.parseFloat(request.getParameter("DiemToan"));
        float diemVan = Float.parseFloat(request.getParameter("DiemVan"));

        try (Connection conn = DBConnection.getConnection()) {
            String checkSQL = "SELECT SBD FROM thisinh WHERE SBD = ?";
            PreparedStatement checkStmt = conn.prepareStatement(checkSQL);
            checkStmt.setString(1, sbd);
            ResultSet rs = checkStmt.executeQuery();

            if (rs.next()) {
                request.setAttribute("message", "Thêm không thành công do trùng số báo danh:"+sbd);
            } else {
                String insertSQL = "INSERT INTO thisinh (SBD, HoTen, DiemToan, DiemVan) VALUES (?, ?, ?, ?)";
                PreparedStatement insertStmt = conn.prepareStatement(insertSQL);
                insertStmt.setString(1, sbd);
                insertStmt.setString(2, hoTen);
                insertStmt.setFloat(3, diemToan);
                insertStmt.setFloat(4, diemVan);
                insertStmt.executeUpdate();
                request.setAttribute("message", "Thêm thành công Số báo danh: " + sbd);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        request.getRequestDispatcher("ThemTS.jsp").forward(request, response);
    
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

///////////////////////////////////////////////////////</CongNhan>
<%-- 
    Document   : ThemTS_DamBaThang
    Created on : Nov 22, 2024, 8:11:03 AM
    Author     : thang
--%>

<%@page import="java.util.List"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="Model.DBConnection"%>
<%@page import="Model.ThiSinh"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.sql.*"%>
<%
    Connection conn = DBConnection.getConnection();
    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT * FROM thisinh");

    List<ThiSinh> dsThiSinh = new ArrayList<>();
    while (rs.next()) {
        ThiSinh ts = new ThiSinh(
            rs.getString("SBD"),
            rs.getString("HoTen"),
            rs.getFloat("DiemToan"),
            rs.getFloat("DiemVan")
        );
        dsThiSinh.add(ts);
    }
%>

<!DOCTYPE html>
<html>
<head>
    <title>Thêm Thí Sinh</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f8fb; /* Màu nền xanh lam nhạt */
            color: #333;
            margin: 0;
            padding: 0;
        }

        h1, h2 {
            text-align: center;
            color: #007bff; /* Màu xanh lam đậm */
        }

        form {
            margin: 20px auto;
            padding: 20px;
            max-width: 600px;
            background-color: #ffffff; /* Nền trắng */
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        form input, form button {
            width: 100%;
            padding: 10px;
            margin: 10px 0;
            border: 1px solid #007bff; /* Đường viền xanh lam */
            border-radius: 5px;
        }

        form input:focus {
            outline: none;
            border-color: #0056b3; /* Màu xanh lam đậm khi focus */
            box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }

        form button {
            background-color: #007bff; /* Nút xanh lam */
            color: #fff;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
        }

        form button:hover {
            background-color: #0056b3; /* Xanh lam đậm khi hover */
        }

        table {
            margin: 20px auto;
            width: 90%;
            border-collapse: collapse;
            background-color: #ffffff;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        }

        table th, table td {
            padding: 12px 15px;
            border: 1px solid #ddd;
            text-align: center;
        }

        table th {
            background-color: #007bff;
            color: #fff;
        }

        table tr:nth-child(even) {
            background-color: #f3f8fb; /* Màu xanh lam nhạt */
        }

        table tr:hover {
            background-color: #e9f5ff; /* Xanh lam nhạt khi hover */
        }

        .message {
            text-align: center;
            font-size: 16px;
            margin-top: 10px;
        }

        .message.success {
            color: #28a745; /* Màu xanh lá */
        }

        .message.error {
            color: #dc3545; /* Màu đỏ */
        }
    </style>
</head>

<body>
    <h1>Thêm Thí Sinh</h1>
    <form action="XLThemTS" method="post">
    Số báo danh: <input type="text" name="SBD" value="<%= request.getParameter("SBD") != null ? request.getParameter("SBD") : "" %>" required><br>
    Họ tên: <input type="text" name="HoTen" value="<%= request.getParameter("HoTen") != null ? request.getParameter("HoTen") : "" %>" required><br>
    Điểm Toán: <input type="number" step="0.1" name="DiemToan" value="<%= request.getParameter("DiemToan") != null ? request.getParameter("DiemToan") : "" %>" required><br>
    Điểm Văn: <input type="number" step="0.1" name="DiemVan" value="<%= request.getParameter("DiemVan") != null ? request.getParameter("DiemVan") : "" %>" required><br>
    <button type="submit">Thêm</button>
</form>

    <h2>Danh sách thí sinh</h2>
    <table border="1">
        <tr>
            <th>SBD</th>
            <th>Họ tên</th>
            <th>Điểm Toán</th>
            <th>Điểm Văn</th>
            <th>Kết quả</th>
        </tr>
        <%
            for (ThiSinh ts : dsThiSinh) {
        %>
        <tr>
            <td><%= ts.getSbd() %></td>
            <td><%= ts.getHoTen() %></td>
            <td><%= ts.getDiemToan() %></td>
            <td><%= ts.getDiemVan() %></td>
            <td><%= ts.getKetQua() %></td>
        </tr>
        <%
            }
        %>
    </table>

    <% if (request.getAttribute("message") != null) { %>
        <p style="color: red;"><%= request.getAttribute("message") %></p>
    <% } %>
</body>
</html>

/////////////////////////////////////////////////////////////////
/////////////////////////////De8_ThemSv///////////////////////////////////
package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    private static final String URL = "jdbc:mysql://localhost:3306/themsinhvien"; // URL của cơ sở dữ liệu
    private static final String USER = "root"; // Tên người dùng của cơ sở dữ liệu
    private static final String PASSWORD = ""; // Mật khẩu người dùng

    // Phương thức để lấy kết nối tới cơ sở dữ liệu
    public static Connection getConnection() throws SQLException {
        try {
            // Đăng ký driver MySQL (nếu chưa đăng ký)
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            throw new SQLException("Không thể tải driver JDBC.");
        }
    }
}
//CREATE DATABASE QLSinhVien;
//USE QLSinhVien;
//CREATE TABLE SinhVien (
//    MaSV VARCHAR(10) PRIMARY KEY, -- Mã sinh viên (kiểu chuỗi, tối đa 10 ký tự)
//    HoTen VARCHAR(50),            -- Họ và tên (kiểu chuỗi, tối đa 50 ký tự)
//    NgaySinh DATE,                -- Ngày sinh (kiểu ngày)
//    DiemTB FLOAT CHECK (DiemTB >= 0 AND DiemTB <= 10) -- Điểm trung bình (kiểu số thực, từ 0 đến 10)
//);
//INSERT INTO SinhVien (MaSV, HoTen, NgaySinh, DiemTB) VALUES
//('SV001', 'Nguyen Van A', '2000-05-10', 9.0),
//('SV002', 'Tran Thi B', '2001-03-15', 8.8),
//('SV003', 'Le Van C', '2000-07-22', 7.5),
//('SV004', 'Pham Thi D', '1999-12-12', 8.2),
//('SV005', 'Hoang Van E', '2000-01-18', 6.0);

///////////////////////////////////////////////////</br>
package model;

public class SinhVien {
    private String MSSV;  
    private String Hoten;  
    private String Lop;    
    private float DiemTB;   

    // Constructor
    public SinhVien(String MSSV, String Hoten, String Lop, float DiemTB) {
        this.MSSV = MSSV;
        this.Hoten = Hoten;
        this.Lop = Lop;
        this.DiemTB = DiemTB;
    }

    // Getter và Setter cho các thuộc tính
    public String getMSSV() {
        return MSSV;
    }

    public void setMSSV(String MSSV) {
        this.MSSV = MSSV;
    }

    public String getHoten() {
        return Hoten;
    }

    public void setHoten(String Hoten) {
        this.Hoten = Hoten;
    }

    public String getLop() {
        return Lop;
    }

    public void setLop(String Lop) {
        this.Lop = Lop;
    }

    public float getDiemTB() {
        return DiemTB;
    }

    public void setDiemTB(float DiemTB) {
        this.DiemTB = DiemTB;
    }

    // Phương thức để xếp loại học lực dựa trên điểm trung bình
    public String getXepLoai() {
        if (DiemTB >= 8.5) {
            return "Giỏi";
        } else if (DiemTB >= 6.5) {
            return "Khá";
        } else if (DiemTB >= 5.0) {
            return "Trung bình";
        } else {
            return "Yếu";
        }
    }

    // Phương thức toString để dễ dàng in thông tin sinh viên
    @Override
    public String toString() {
        return "MSSV: " + MSSV + ", Họ tên: " + Hoten + ", Lớp: " + Lop + ", Điểm TB: " + DiemTB + ", Xếp loại: " + getXepLoai();
    }

    // Phương thức equals và hashCode (nếu cần thiết để so sánh đối tượng SinhVien)
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        SinhVien sinhVien = (SinhVien) obj;
        return MSSV != null && MSSV.equals(sinhVien.MSSV);
    }

    @Override
    public int hashCode() {
        return MSSV != null ? MSSV.hashCode() : 0;
    }
}

//////////////////////////////////////////////////////////////</form>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;
import jakarta.servlet.RequestDispatcher;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLThemSV", urlPatterns = {"/XLThemSV"})
public class XLThemSV extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLThemSV</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLThemSV at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       // processRequest(request, response);
         String mssv = request.getParameter("mssv");
        String hoten = request.getParameter("hoten");
        String lop = request.getParameter("lop");
        float diemTB = Float.parseFloat(request.getParameter("diemTB"));

        // Tạo đối tượng SinhVien
        SinhVien sinhVienMoi = new SinhVien(mssv, hoten, lop, diemTB);
        
        // Xử lý kết nối CSDL
        Connection conn = null;
        PreparedStatement stmt = null;
        ResultSet rs = null;
        String message = null;

        try {
            conn = DatabaseConnection.getConnection();
            
            // Kiểm tra MSSV có bị trùng hay không
            String checkSQL = "SELECT * FROM sinhvien WHERE MSSV = ?";
            stmt = conn.prepareStatement(checkSQL);
            stmt.setString(1, mssv);
            rs = stmt.executeQuery();
            
            if (rs.next()) {
                // MSSV đã tồn tại
                message = "Thêm không thành công do trùng Mã số sinh viên " +mssv;
            } else {
                // Thêm sinh viên vào cơ sở dữ liệu
                String insertSQL = "INSERT INTO sinhvien (MSSV, Hoten, Lop, DiemTB) VALUES (?, ?, ?, ?)";
                stmt = conn.prepareStatement(insertSQL);
                stmt.setString(1, mssv);
                stmt.setString(2, hoten);
                stmt.setString(3, lop);
                stmt.setFloat(4, diemTB);
                int rowsAffected = stmt.executeUpdate();
                
                if (rowsAffected > 0) {
                    message = "Thêm thành công Mã số sinh viên: " + mssv;
                } else {
                    message = "Thêm không thành công.";
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
            message = "Có lỗi xảy ra khi thêm sinh viên.";
        } finally {
            // Đóng kết nối CSDL
            try {
                if (rs != null) rs.close();
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        // Đưa thông báo vào request để hiển thị trên ThemSV.jsp
        request.setAttribute("message", message);

        // Chuyển hướng về ThemSV.jsp để hiển thị lại danh sách và thông báo
        RequestDispatcher dispatcher = request.getRequestDispatcher("ThemSV.jsp");
        dispatcher.forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        //processRequest(request, response);
          doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

//////////////////////////////////////////////////////////////////////</body>
<%@page import="java.text.DecimalFormat"%>
<%@page import="model.DatabaseConnection"%>
<%@page import="model.SinhVien"%>
<%@page import="java.util.List"%>
<%@page import="java.sql.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%
    // Khai báo các đối tượng kết nối CSDL và các danh sách chứa dữ liệu
    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;
    List<SinhVien> danhSachToanBo = new ArrayList<>();
    
    try {
        // Kết nối đến cơ sở dữ liệu
        conn = DatabaseConnection.getConnection(); // Đảm bảo DatabaseConnection có phương thức getConnection()
        stmt = conn.createStatement();

        // Thực thi câu truy vấn SQL để lấy toàn bộ sinh viên
        rs = stmt.executeQuery("SELECT * FROM sinhvien");

        // Lặp qua kết quả và thêm vào danh sách
        while (rs.next()) {
            String mssv = rs.getString("MSSV");
            String hoten = rs.getString("Hoten");
            String lop = rs.getString("Lop");
            float diemTB = rs.getFloat("DiemTB");

            // Tạo đối tượng SinhVien và thêm vào danh sách
            SinhVien sv = new SinhVien(mssv, hoten, lop, diemTB);
            danhSachToanBo.add(sv);
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        // Đóng kết nối CSDL
        try {
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
%>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thêm Sinh Viên</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f9f9f9;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        .form-container {
            margin-bottom: 20px;
        }
        .message {
            margin-top: 20px;
            font-weight: bold;
        }
        .message.success {
            color: green;
        }
        .message.error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Thêm Sinh Viên</h1>

    <form action="XLThemSV" method="post">
        <div class="form-container">
            <label for="mssv">Mã số sinh viên:</label>
            <input type="text" id="mssv" name="mssv" value="<%= request.getParameter("mssv") != null ? request.getParameter("mssv") : "" %>" required>
        </div>
        <div class="form-container">
            <label for="hoten">Họ tên:</label>
            <input type="text" id="hoten" name="hoten" value="<%= request.getParameter("hoten") != null ? request.getParameter("hoten") : "" %>" required>
        </div>
        <div class="form-container">
            <label for="lop">Lớp:</label>
            <input type="text" id="lop" name="lop" value="<%= request.getParameter("lop") != null ? request.getParameter("lop") : "" %>" required>
        </div>
        <div class="form-container">
            <label for="diemTB">Điểm trung bình:</label>
            <input type="number" step="0.01" id="diemTB" name="diemTB" value="<%= request.getParameter("diemTB") != null ? request.getParameter("diemTB") : "" %>" required>
        </div>
        <button type="submit">Thêm</button>
    </form>

    <% 
        // Hiển thị thông báo khi thêm sinh viên thành công hoặc không thành công
        String message = (String) request.getAttribute("message");
        if (message != null) { 
            String messageClass = message.equals("Thêm thành công") ? "success" : "error";
    %>
    <div class="message <%= messageClass %>">
        <%= message %>
    </div>
    <% } %>

    <h2>Danh sách sinh viên</h2>
    <table>
        <tr>
            <th>MSSV</th>
            <th>Họ tên</th>
            <th>Lớp</th>
            <th>Điểm TB</th>
            <th>Xếp loại</th>
        </tr>

        <% 
            // Định dạng điểm trung bình (DiemTB)
            DecimalFormat df = new DecimalFormat("0.00");

            // Hiển thị danh sách sinh viên đã có trong cơ sở dữ liệu
            for (SinhVien sv : danhSachToanBo) {
                String xepLoai = "Yếu"; // Mặc định xếp loại Yếu
                float diemTB = sv.getDiemTB();
                if (diemTB >= 8.5) {
                    xepLoai = "Giỏi";
                } else if (diemTB >= 6.5) {
                    xepLoai = "Khá";
                } else if (diemTB >= 5.0) {
                    xepLoai = "Trung bình";
                }

        %>
        <tr>
            <td><%= sv.getMSSV() %></td>
            <td><%= sv.getHoten() %></td>
            <td><%= sv.getLop() %></td>
            <td><%= df.format(sv.getDiemTB()) %></td> <!-- Hiển thị điểm TB với định dạng 2 chữ số thập phân -->
            <td><%= xepLoai %></td>
        </tr>
        <% } %>
    </table>
</body>
</html>

////////////////////////////////////////////////////////////</>
//////////////////////////De9_ThemGV///////////////////////////////////</SinhVien>
package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    
    private static final String URL = "jdbc:mysql://localhost:3306/qlgiaovien";
    private static final String USER = "root"; // Thay đổi nếu cần
    private static final String PASSWORD = ""; // Thay đổi nếu cần
    
    // Phương thức để lấy kết nối
    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            throw new SQLException("Driver không tìm thấy!", e);
        }
    }
}
//-- Tạo cơ sở dữ liệu QLGiaoVien
//CREATE DATABASE QLGiaoVien;
//
//-- Sử dụng cơ sở dữ liệu QLGiaoVien
//USE QLGiaoVien;
//
//-- Tạo bảng GiaoVien
//CREATE TABLE GiaoVien (
//    MaGV VARCHAR(20) PRIMARY KEY, -- Mã giáo viên
//    Hoten VARCHAR(100),           -- Họ tên giáo viên
//    NamSinh INT,                  -- Năm sinh của giáo viên
//    HeSoLuong FLOAT               -- Hệ số lương
//);
//
//-- Thêm dữ liệu mẫu vào bảng GiaoVien
//INSERT INTO GiaoVien (MaGV, Hoten, NamSinh, HeSoLuong) VALUES
//('GV001', 'Nguyễn Văn A', 1970, 2.5),
//('GV002', 'Trần Thị B', 1980, 3.0),
//('GV003', 'Lê Hoàng C', 1990, 2.0),
//('GV004', 'Phạm Thị D', 1965, 3.2),
//('GV005', 'Vũ Hoàng E', 1985, 2.8);

///////////////////////////////////////////////////////////////</html>
package model;

public class GiaoVien {
    private String maGV;  // Mã số giáo viên
    private String hoten; // Họ tên giáo viên
    private int namSinh;  // Năm sinh của giáo viên
    private float heSoLuong; // Hệ số lương

    // Constructor
    public GiaoVien(String maGV, String hoten, int namSinh, float heSoLuong) {
        this.maGV = maGV;
        this.hoten = hoten;
        this.namSinh = namSinh;
        this.heSoLuong = heSoLuong;
    }

    // Getter và Setter cho các thuộc tính
    public String getMaGV() {
        return maGV;
    }

    public void setMaGV(String maGV) {
        this.maGV = maGV;
    }

    public String getHoten() {
        return hoten;
    }

    public void setHoten(String hoten) {
        this.hoten = hoten;
    }

    public int getNamSinh() {
        return namSinh;
    }

    public void setNamSinh(int namSinh) {
        this.namSinh = namSinh;
    }

    public float getHeSoLuong() {
        return heSoLuong;
    }

    public void setHeSoLuong(float heSoLuong) {
        this.heSoLuong = heSoLuong;
    }

    // Phương thức tính số tiền trợ cấp dựa trên độ tuổi
    public String tinhTroCap() {
        int tuoi = 2024 - this.namSinh; // Tính tuổi từ năm hiện tại
        if (tuoi >= 50) {
            return "2 triệu VNĐ";
        } else if (tuoi >= 40) {
            return "1 triệu VNĐ";
        } else {
            return "Không có trợ cấp";
        }
    }
}

///////////////////////////////////////////////////////////</>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;

import jakarta.servlet.RequestDispatcher;
import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLThemGV", urlPatterns = {"/XLThemGV"})
public class XLThemGV extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLThemGV</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLThemGV at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
         String maGV = request.getParameter("maGV");
        String hoten = request.getParameter("hoten");
        int namSinh = Integer.parseInt(request.getParameter("namSinh"));
        float heSoLuong = Float.parseFloat(request.getParameter("heSoLuong"));

        Connection conn = null;
        PreparedStatement stmt = null;
        String message = "Thêm không thành công";

        try {
            conn = DatabaseConnection.getConnection();
            
            // Kiểm tra mã số giáo viên đã tồn tại chưa
            String checkSQL = "SELECT COUNT(*) FROM giaovien WHERE MaGV = ?";
            stmt = conn.prepareStatement(checkSQL);
            stmt.setString(1, maGV);
            ResultSet rs = stmt.executeQuery();
            rs.next();
            int count = rs.getInt(1);
            if (count == 0) {
                // Thêm giáo viên mới
                String insertSQL = "INSERT INTO giaovien (MaGV, Hoten, NamSinh, HeSoLuong) VALUES (?, ?, ?, ?)";
                stmt = conn.prepareStatement(insertSQL);
                stmt.setString(1, maGV);
                stmt.setString(2, hoten);
                stmt.setInt(3, namSinh);
                stmt.setFloat(4, heSoLuong);
                stmt.executeUpdate();
                message = "Thêm thành công Mã số giáo viên: " + maGV;
            } else {
                message = "Thêm không thành công "+maGV+" do trùng Mã số giáo viên.";
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }

        // Chuyển hướng về trang ThemGV.jsp và hiển thị thông báo
        request.setAttribute("message", message);
        request.getRequestDispatcher("ThemGV.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
       // processRequest(request, response);
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

/////////////////////////////////////////////////////////////////////</ThiSinh>
<%@page import="java.text.DecimalFormat"%>
<%@page import="model.DatabaseConnection"%>
<%@page import="model.GiaoVien"%>
<%@page import="java.util.List"%>
<%@page import="java.sql.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>

<%
    Connection conn = null;
    Statement stmt = null;
    ResultSet rs = null;
    List<GiaoVien> danhSachToanBo = new ArrayList<>();

    try {
        conn = DatabaseConnection.getConnection();
        stmt = conn.createStatement();
        rs = stmt.executeQuery("SELECT * FROM giaovien");

        while (rs.next()) {
            String maGV = rs.getString("MaGV");
            String hoten = rs.getString("Hoten");
            int namSinh = rs.getInt("NamSinh");
            float heSoLuong = rs.getFloat("HeSoLuong");

            GiaoVien gv = new GiaoVien(maGV, hoten, namSinh, heSoLuong);
            danhSachToanBo.add(gv);
        }
    } catch (Exception e) {
        e.printStackTrace();
    } finally {
        try {
            if (rs != null) rs.close();
            if (stmt != null) stmt.close();
            if (conn != null) conn.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
%>

<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thêm Giáo Viên</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f9f9f9;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        .form-container {
            margin-bottom: 20px;
        }
    </style>
</head>

<body>
    <h1>Thêm Giáo Viên</h1>

    <form action="XLThemGV" method="post">
        <div class="form-container">
            <label for="maGV">Mã số giáo viên:</label>
            <input type="text" id="maGV" name="maGV" value="<%= request.getParameter("maGV") != null ? request.getParameter("maGV") : "" %>" required>
        </div>
        <div class="form-container">
            <label for="hoten">Họ tên:</label>
            <input type="text" id="hoten" name="hoten" value="<%= request.getParameter("hoten") != null ? request.getParameter("hoten") : "" %>" required>
        </div>
        <div class="form-container">
            <label for="namSinh">Năm sinh:</label>
            <input type="number" id="namSinh" name="namSinh" value="<%= request.getParameter("namSinh") != null ? request.getParameter("namSinh") : "" %>" required>
        </div>
        <div class="form-container">
            <label for="heSoLuong">Hệ số lương:</label>
            <input type="number" step="0.1" id="heSoLuong" name="heSoLuong" value="<%= request.getParameter("heSoLuong") != null ? request.getParameter("heSoLuong") : "" %>" required>
        </div>
        <button type="submit">Thêm</button>
    </form>
<div class="message">
        <%= request.getAttribute("message") != null ? request.getAttribute("message") : "" %>
    </div>
    <h2>Danh sách giáo viên</h2>
    <table>
        <tr>
            <th>Mã số</th>
            <th>Họ tên</th>
            <th>Năm sinh</th>
            <th>Hệ số lương</th>
            <th>Số tiền trợ cấp</th>
        </tr>

        <% 
            for (GiaoVien gv : danhSachToanBo) {
        %>
        <tr>
            <td><%= gv.getMaGV() %></td>
            <td><%= gv.getHoten() %></td>
            <td><%= gv.getNamSinh() %></td>
            <td><%= gv.getHeSoLuong() %></td>
            <td><%= gv.tinhTroCap() %></td>
        </tr>
        <% } %>
    </table>
</body>
</html>

///////////////////////////////////////////////////////////////
///////////////////////////////De10_ThemNV//////////////////////////////////</>
package model;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/qlnhanvien";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
//-- Tạo cơ sở dữ liệu
//CREATE DATABASE QLNhanVien;
//
//-- Sử dụng cơ sở dữ liệu
//USE QLNhanVien;
//
//-- Tạo bảng NhanVien
//CREATE TABLE NhanVien (
//    MaNV VARCHAR(50) PRIMARY KEY,
//    Hoten VARCHAR(100),
//    ChucVu VARCHAR(50),
//    HeSoLuong DECIMAL(5,2)
//);
//INSERT INTO NhanVien (MaNV, Hoten, ChucVu, HeSoLuong) VALUES
//('NV001', 'Nguyen Thi Mai', 'Giám Đốc', 10),
//('NV002', 'Tran Minh Tuan', 'Phó Giám Đốc', 8),
//('NV003', 'Le Thi Thu', 'Trưởng phòng', 6),
//('NV004', 'Hoang Hoai Nam', 'Nhân viên', 3),
//('NV005', 'Nguyen Thanh Son', 'Nhân viên', 2);


/////////////////////////////////////////////////////////</GiaoVien>
package model;

import java.math.BigDecimal;

public class NhanVien {

    private String maNV;
    private String hoten;
    private String chucVu;
    private BigDecimal heSoLuong;

    // Constructor
    public NhanVien(String maNV, String hoten, String chucVu, BigDecimal heSoLuong) {
        this.maNV = maNV;
        this.hoten = hoten;
        this.chucVu = chucVu;
        this.heSoLuong = heSoLuong;
    }

    // Getter and Setter
    public String getMaNV() {
        return maNV;
    }

    public void setMaNV(String maNV) {
        this.maNV = maNV;
    }

    public String getHoten() {
        return hoten;
    }

    public void setHoten(String hoten) {
        this.hoten = hoten;
    }

    public String getChucVu() {
        return chucVu;
    }

    public void setChucVu(String chucVu) {
        this.chucVu = chucVu;
    }

    public BigDecimal getHeSoLuong() {
        return heSoLuong;
    }

    public void setHeSoLuong(BigDecimal heSoLuong) {
        this.heSoLuong = heSoLuong;
    }
}
//////////////////////////////////////////////////////////</body>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;


import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLThemNV", urlPatterns = {"/XLThemNV"})
public class XLThemNV extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLThemNV</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLThemNV at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String maNV = request.getParameter("maNV");
        String hoten = request.getParameter("hoten");
        String chucvu = request.getParameter("chucvu");
        double hesoluong = Double.parseDouble(request.getParameter("hesoluong"));

        Connection conn = null;
        try {
            conn = DatabaseConnection.getConnection();
        } catch (Exception ex) {
            Logger.getLogger(XLThemNV.class.getName()).log(Level.SEVERE, null, ex);
        }
        String query = "SELECT * FROM nhanvien WHERE MaNV = ?";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, maNV);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                request.setAttribute("message", "Thêm không thành công do trùng Mã số nhân viên "+ maNV);
                request.getRequestDispatcher("ThemNV.jsp").forward(request, response);
            } else {
                query = "INSERT INTO nhanvien (MaNV, Hoten, ChucVu, HeSoLuong) VALUES (?, ?, ?, ?)";
                ps = conn.prepareStatement(query);
                ps.setString(1, maNV);
                ps.setString(2, hoten);
                ps.setString(3, chucvu);
                ps.setDouble(4, hesoluong);
                ps.executeUpdate();

                request.setAttribute("message", "Thêm thành công Mã số nhân viên " + maNV);
                request.getRequestDispatcher("ThemNV.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.getWriter().println("Lỗi: " + e.getMessage());
    }
    }
    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

/////////////////////////////////////////////////////////</html>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="model.NhanVien"%>
<%@page import="model.DatabaseConnection"%>
<%@page import="java.sql.*"%>
<!DOCTYPE html>
<html>
<head>
    <title>Thêm Nhân Viên</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ccc;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
        form {
            margin-bottom: 20px;
        }
        .input-field {
            margin-bottom: 10px;
        }
        label {
            display: inline-block;
            width: 150px;
        }
        input[type="text"], input[type="number"] {
            width: 300px;
            padding: 5px;
        }
        button {
            padding: 10px 15px;
            background-color: #28a745;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #218838;
        }
        .message {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Quản Lý Nhân Viên</h1>
    <form action="XLThemNV" method="POST">
        <div class="input-field">
            <label for="maNV">Mã NV:</label>
            <input type="text" id="maNV" name="maNV" 
                   value="<%= request.getParameter("maNV") != null ? request.getParameter("maNV") : "" %>" required>
        </div>
        <div class="input-field">
            <label for="hoten">Họ và Tên:</label>
            <input type="text" id="hoten" name="hoten" 
                   value="<%= request.getParameter("hoten") != null ? request.getParameter("hoten") : "" %>" required>
        </div>
        <div class="input-field">
            <label for="chucvu">Chức vụ:</label>
            <input type="text" id="chucvu" name="chucvu" 
                   value="<%= request.getParameter("chucvu") != null ? request.getParameter("chucvu") : "" %>" required>
        </div>
        <div class="input-field">
            <label for="hesoluong">Hệ số lương:</label>
            <input type="number" id="hesoluong" name="hesoluong" 
                   value="<%= request.getParameter("hesoluong") != null ? request.getParameter("hesoluong") : "" %>" required>
        </div>
        <button type="submit">Thêm</button>
    </form>

    <div class="message">
        <%= request.getAttribute("message") != null ? request.getAttribute("message") : "" %>
    </div>

    <h2>Danh sách nhân viên</h2>
    <table>
        <tr>
            <th>Mã NV</th>
            <th>Họ và Tên</th>
            <th>Chức vụ</th>
            <th>Hệ số lương</th>
            <th>Phụ cấp</th>
        </tr>
        <%
            ArrayList<NhanVien> dsNhanVien = new ArrayList<>();
            try (Connection conn = DatabaseConnection.getConnection()) {
                String query = "SELECT * FROM nhanvien";
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery();

                while (rs.next()) {
                    NhanVien nv = new NhanVien(
                        rs.getString("MaNV"),
                        rs.getString("Hoten"),
                        rs.getString("ChucVu"),
                        rs.getBigDecimal("HeSoLuong")
                    );
                    dsNhanVien.add(nv);
                }
            } catch (SQLException e) {
                out.println("Lỗi: " + e.getMessage());
            }

            for (NhanVien nv : dsNhanVien) {
                int phuCap = 1000000; // Default phụ cấp cho nhân viên
                if (nv.getChucVu().equalsIgnoreCase("Giám Đốc")) {
                    phuCap = 10000000;
                } else if (nv.getChucVu().equalsIgnoreCase("Phó Giám Đốc")) {
                    phuCap = 7000000;
                } else if (nv.getChucVu().equalsIgnoreCase("Trưởng phòng")) {
                    phuCap = 5000000;
                }

        %>
            <tr>
                <td><%= nv.getMaNV() %></td>
                <td><%= nv.getHoten() %></td>
                <td><%= nv.getChucVu() %></td>
                <td><%= nv.getHeSoLuong() %></td>
                <td><%= String.format("%,d", phuCap) %> VNĐ</td>
            </tr>
        <%
            }
        %>
    </table>
</body>
</html>

/////////////////////////////////////////////////////////</body>
/////////////////////////////De11_ThemVDV////////////////////////////</html>
package model;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/qlvandongvien";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
//CREATE DATABASE QLVanDongVien;
//
//USE QLVanDongVien;
//
//CREATE TABLE VDVien (
//    MaVDV VARCHAR(10) PRIMARY KEY,
//    Hoten VARCHAR(50),
//    SoNamTD INT,
//    SoHC INT
//);
//
//INSERT INTO VDVien (MaVDV, Hoten, SoNamTD, SoHC) VALUES 
//('VDV001', 'Nguyen Van A', 5, 10),
//('VDV002', 'Le Thi B', 3, 7),
//('VDV003', 'Tran Van C', 6, 15),
//('VDV004', 'Pham Thi D', 4, 8),
//('VDV005', 'Hoang Van E', 2, 5);

///////////////////////////////////////////////////////</>
package model;

public class VDVien {
    private String maVDV;
    private String hoten;
    private int soNamTD;
    private int soHC;

    public VDVien(String maVDV, String hoten, int soNamTD, int soHC) {
        this.maVDV = maVDV;
        this.hoten = hoten;
        this.soNamTD = soNamTD;
        this.soHC = soHC;
    }

    public String getMaVDV() { return maVDV; }
     public String getHoten() { return hoten; }
    public int getSoNamTD() { return soNamTD; }
    public int getSoHC() { return soHC; }

    public void setMaVDV(String maVDV) { this.maVDV = maVDV; }
    public void setHoten(String hoten) { this.hoten = hoten; }
    public void setSoNamTD(int soNamTD) { this.soNamTD = soNamTD; }
    public void setSoHC(int soHC) { this.soHC = soHC; }
}

/////////////////////////////////////////////////////</CongNhan>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLThemVDV", urlPatterns = {"/XLThemVDV"})
public class XLThemVDV extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLThemVDV</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLThemVDV at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
             throws ServletException, IOException {
        String maVDV = request.getParameter("maVDV");
        String hoten = request.getParameter("hoten");
        int soNamTD = Integer.parseInt(request.getParameter("soNamTD"));
        int soHC = Integer.parseInt(request.getParameter("soHC"));

        Connection conn = null;
        try {
            conn = DatabaseConnection.getConnection();
        } catch (Exception ex) {
            Logger.getLogger(XLThemVDV.class.getName()).log(Level.SEVERE, null, ex);
        }
        String query = "SELECT * FROM VDVien WHERE MaVDV = ?";
        try {
            PreparedStatement ps = conn.prepareStatement(query);
            ps.setString(1, maVDV);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                request.setAttribute("message", "Thêm không thành công do trùng Mã số vận động viên:"+maVDV+".");
                request.getRequestDispatcher("ThemVDV.jsp").forward(request, response);
            } else {
                query = "INSERT INTO VDVien (MaVDV, Hoten, SoNamTD, SoHC) VALUES (?, ?, ?, ?)";
                ps = conn.prepareStatement(query);
                ps.setString(1, maVDV);
                ps.setString(2, hoten);
                ps.setInt(3, soNamTD);
                ps.setInt(4, soHC);
                ps.executeUpdate();

                request.setAttribute("message", "Thêm thành công Mã số vận động viên " + maVDV);
                request.getRequestDispatcher("ThemVDV.jsp").forward(request, response);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            response.getWriter().println("Lỗi: " + e.getMessage());
        }
    }
    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

///////////////////////////////////////////////////</editor-fold>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="model.VDVien"%>
<%@page import="model.DatabaseConnection"%>
<%@page import="java.sql.*"%>
<!DOCTYPE html>
<html>
<head>
    <title>Thêm Vận Động Viên</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h1 {
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        table, th, td {
            border: 1px solid #ccc;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #f4f4f4;
        }
        form {
            margin-bottom: 20px;
        }
        .input-field {
            margin-bottom: 10px;
        }
        label {
            display: inline-block;
            width: 150px;
        }
        input[type="text"], input[type="number"] {
            width: 300px;
            padding: 5px;
        }
        button {
            padding: 10px 15px;
            background-color: #28a745;
            color: white;
            border: none;
            cursor: pointer;
        }
        button:hover {
            background-color: #218838;
        }
        .message {
            color: red;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Quản Lý Vận Động Viên</h1>
    <form action="XLThemVDV" method="POST">
        <div class="input-field">
            <label for="maVDV">Mã VĐV:</label>
            <input type="text" id="maVDV" name="maVDV" 
                   value="<%= request.getParameter("maVDV") != null ? request.getParameter("maVDV") : "" %>" required>
        </div>
        <div class="input-field">
            <label for="hoten">Họ và Tên:</label>
            <input type="text" id="hoten" name="hoten" 
                   value="<%= request.getParameter("hoten") != null ? request.getParameter("hoten") : "" %>" required>
        </div>
        <div class="input-field">
            <label for="soNamTD">Số năm thi đấu:</label>
            <input type="number" id="soNamTD" name="soNamTD" 
                   value="<%= request.getParameter("soNamTD") != null ? request.getParameter("soNamTD") : "" %>" required>
        </div>
        <div class="input-field">
            <label for="soHC">Số huy chương:</label>
            <input type="number" id="soHC" name="soHC" 
                   value="<%= request.getParameter("soHC") != null ? request.getParameter("soHC") : "" %>" required>
        </div>
        <button type="submit">Thêm</button>
    </form>

    <div class="message">
        <%= request.getAttribute("message") != null ? request.getAttribute("message") : "" %>
    </div>

    <h2>Danh sách vận động viên</h2>
    <table>
        <tr>
            <th>Mã VĐV</th>
            <th>Họ và Tên</th>
            <th>Số năm thi đấu</th>
            <th>Số huy chương</th>
            <th>Tiền thưởng</th>
        </tr>
        <%
            ArrayList<VDVien> dsVDV = new ArrayList<>();
            try (Connection conn = DatabaseConnection.getConnection()) {
                String query = "SELECT * FROM vdvien";
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery();

                while (rs.next()) {
                    VDVien vdv = new VDVien(
                        rs.getString("MaVDV"),
                        rs.getString("Hoten"),
                        rs.getInt("SoNamTD"),
                        rs.getInt("SoHC")
                    );
                    dsVDV.add(vdv);
                }
            } catch (SQLException e) {
                out.println("Lỗi: " + e.getMessage());
            }

            for (VDVien vdv : dsVDV) {
                int tienThuong = (vdv.getSoHC() * 5000000) + (vdv.getSoNamTD() * 400000);
        %>
            <tr>
                <td><%= vdv.getMaVDV() %></td>
                <td><%= vdv.getHoten() %></td>
                <td><%= vdv.getSoNamTD() %></td>
                <td><%= vdv.getSoHC() %></td>
                <td><%= String.format("%,d", tienThuong) %> VNĐ</td>
            </tr>
        <%
            }
        %>
    </table>
</body>
</html>

//////////////////////////////////////////////////////////////
//////////////////////////////De12_ThemTL///////////////////////////
package model;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/qltulanh";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
//CREATE DATABASE QLTuLanh;
//
//USE QLTuLanh;
//
//CREATE TABLE TuLanh (
//    Ma VARCHAR(10) PRIMARY KEY,
//    HangSX VARCHAR(50),
//    DungTich INT,
//    SoLuong INT
//);
//
//-- Thêm 5 bản ghi
//INSERT INTO TuLanh (Ma, HangSX, DungTich, SoLuong)
//VALUES 
//('TL01', 'Samsung', 300, 5),
//('TL02', 'LG', 200, 10),
//('TL03', 'Panasonic', 250, 8),
//('TL04', 'Hitachi', 400, 3),
//('TL05', 'Sharp', 180, 12);

////////////////////////////////////////////////////</body>
package model;

public class TuLanh {
    private String ma;
    private String hangSX;
    private int dungTich;
    private int soLuong;
    private double tienVanChuyen;

    // Constructor
    public TuLanh(String ma, String hangSX, int dungTich, int soLuong) {
        this.ma = ma;
        this.hangSX = hangSX;
        this.dungTich = dungTich;
        this.soLuong = soLuong;
        this.tienVanChuyen = dungTich * 50000 * soLuong; // Tính tiền vận chuyển
    }

    // Getters and Setters
    public String getMa() {
        return ma;
    }

    public void setMa(String ma) {
        this.ma = ma;
    }

    public String getHangSX() {
        return hangSX;
    }

    public void setHangSX(String hangSX) {
        this.hangSX = hangSX;
    }

    public int getDungTich() {
        return dungTich;
    }

    public void setDungTich(int dungTich) {
        this.dungTich = dungTich;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public double getTienVanChuyen() {
        return tienVanChuyen;
    }

    public void setTienVanChuyen(double tienVanChuyen) {
        this.tienVanChuyen = tienVanChuyen;
    }
}

///////////////////////////////////////////////////////////////</html>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLThemTL", urlPatterns = {"/XLThemTL"})
public class XLThemTL extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLThemTL</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLThemTL at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String ma = request.getParameter("ma");
        String hangSX = request.getParameter("hangSX");
        int dungTich = Integer.parseInt(request.getParameter("dungTich"));
        int soLuong = Integer.parseInt(request.getParameter("soLuong"));
        String message;

        try (Connection conn = DatabaseConnection.getConnection()) {
            // Kiểm tra mã trùng
            String checkQuery = "SELECT COUNT(*) FROM tulanh WHERE Ma = ?";
            PreparedStatement checkPs = conn.prepareStatement(checkQuery);
            checkPs.setString(1, ma);
            ResultSet rs = checkPs.executeQuery();
            rs.next();

            if (rs.getInt(1) > 0) {
                message = "Thêm không thành công do trùng Mã tủ lạnh " + ma;
            } else {
                // Thêm tủ lạnh
                String insertQuery = "INSERT INTO tulanh (Ma, HangSX, DungTich, SoLuong) VALUES (?, ?, ?, ?)";
                PreparedStatement insertPs = conn.prepareStatement(insertQuery);
                insertPs.setString(1, ma);
                insertPs.setString(2, hangSX);
                insertPs.setInt(3, dungTich);
                insertPs.setInt(4, soLuong);
                insertPs.executeUpdate();

                message = "Thêm thành công Mã tủ lạnh " + ma;
            }
        } catch (Exception e) {
            message = "Lỗi: " + e.getMessage();
        }

        request.setAttribute("message", message);
        request.getRequestDispatcher("ThemTL.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

//////////////////////////////////////////////////////////////////</body>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="model.TuLanh"%>
<%@page import="model.DatabaseConnection"%>
<%@page import="java.sql.*"%>
<!DOCTYPE html>
<html>
<head>
    <title>Quản Lý Tủ Lạnh</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 80%;
            margin: 20px auto;
            padding: 20px;
            background: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h1 {
            text-align: center;
            color: #333333;
            margin-bottom: 20px;
        }
        form {
            margin-bottom: 30px;
        }
        form label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
            color: #555555;
        }
        form input {
            width: calc(100% - 20px);
            padding: 10px;
            margin-bottom: 15px;
            border: 1px solid #cccccc;
            border-radius: 4px;
        }
        form button {
            background: #4CAF50;
            color: #ffffff;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        form button:hover {
            background: #45a049;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table th, table td {
            text-align: left;
            padding: 10px;
            border-bottom: 1px solid #dddddd;
        }
        table th {
            background: #f8f8f8;
            color: #333333;
            font-weight: bold;
        }
        table tr:hover {
            background: #f1f1f1;
        }
        .alert {
            color: red;
            font-weight: bold;
            margin-top: 15px;
        }
        .success {
            color: green;
            font-weight: bold;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Quản Lý Tủ Lạnh</h1>
        <!-- Form Thêm Tủ Lạnh -->
        <form action="XLThemTL" method="POST">
            <label for="ma">Mã Tủ Lạnh</label>
            <input type="text" id="ma" name="ma" required value="<%= request.getParameter("ma") != null ? request.getParameter("ma") : "" %>">
            
            <label for="hangSX">Hãng Sản Xuất</label>
            <input type="text" id="hangSX" name="hangSX" required value="<%= request.getParameter("hangSX") != null ? request.getParameter("hangSX") : "" %>">
            
            <label for="dungTich">Dung Tích (lít)</label>
            <input type="number" id="dungTich" name="dungTich" required value="<%= request.getParameter("dungTich") != null ? request.getParameter("dungTich") : "" %>">
            
            <label for="soLuong">Số Lượng</label>
            <input type="number" id="soLuong" name="soLuong" required value="<%= request.getParameter("soLuong") != null ? request.getParameter("soLuong") : "" %>">
            
            <button type="submit">Thêm</button>
        </form>
        <%
            String message = (String) request.getAttribute("message");
            if (message != null) {
        %>
        <p class="<%= message.contains("thành công") ? "success" : "alert" %>"><%= message %></p>
        <%
            }
        %>
        <!-- Hiển Thị Danh Sách Tủ Lạnh -->
        <table>
            <tr>
                <th>Mã</th>
                <th>Hãng Sản Xuất</th>
                <th>Dung Tích</th>
                <th>Số Lượng</th>
                <th>Tiền Vận Chuyển</th>
            </tr>
            <%
                ArrayList<TuLanh> danhSach = new ArrayList<>();
                try (Connection conn = DatabaseConnection.getConnection()) {
                    String query = "SELECT * FROM TuLanh";
                    PreparedStatement ps = conn.prepareStatement(query);
                    ResultSet rs = ps.executeQuery();
                    
                    while (rs.next()) {
                        TuLanh tl = new TuLanh(
                            rs.getString("Ma"),
                            rs.getString("HangSX"),
                            rs.getInt("DungTich"),
                            rs.getInt("SoLuong")
                        );
                        danhSach.add(tl);
                    }
                } catch (SQLException e) {
                    out.println("<p class='alert'>Lỗi khi tải dữ liệu: " + e.getMessage() + "</p>");
                }

                for (TuLanh tl : danhSach) {
                    long tienVanChuyen = (long) tl.getDungTich() * 50000 * tl.getSoLuong();
            %>
            <tr>
                <td><%= tl.getMa() %></td>
                <td><%= tl.getHangSX() %></td>
                <td><%= tl.getDungTich() %></td>
                <td><%= tl.getSoLuong() %></td>
                <td><%= String.format("%,d", tienVanChuyen) %> VND</td>
            </tr>
            <%
                }
            %>
        </table>

        <!-- Thông Báo -->
        
    </div>
</body>
</html>

/////////////////////////////////////////////////////////////////////
///////////////////////////////De13_XoaBH////////////////////////////////////</html>
package model;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/qlbanhang";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    public static Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
//-- Tạo cơ sở dữ liệu QLBanHang
//CREATE DATABASE QLBanHang;
//
//-- Sử dụng cơ sở dữ liệu
//USE QLBanHang;
//
//-- Tạo bảng BanHang
//CREATE TABLE BanHang (
//    MaKH VARCHAR(10) NOT NULL,
//    MaSP VARCHAR(10) NOT NULL,
//    GiaSP DECIMAL(10, 2) NOT NULL,
//    SoLuong INT NOT NULL,
//    PRIMARY KEY (MaKH, MaSP)
//);
//
//-- Thêm dữ liệu mẫu vào bảng BanHang
//INSERT INTO BanHang (MaKH, MaSP, GiaSP, SoLuong)
//VALUES
//    ('KH001', 'SP001', 20000, 5),
//    ('KH002', 'SP002', 15000, 3),
//    ('KH003', 'SP003', 10000, 10),
//    ('KH004', 'SP004', 5000, 8),
//    ('KH005', 'SP005', 30000, 2);

////////////////////////////////////////////////////////////////
package model;

public class BanHang {
    private String maKH;
    private String maSP;
    private double giaSP;
    private int soLuong;
    private double thanhTien;

    // Constructor
    public BanHang(String maKH, String maSP, double giaSP, int soLuong) {
        this.maKH = maKH;
        this.maSP = maSP;
        this.giaSP = giaSP;
        this.soLuong = soLuong;
        this.thanhTien = (giaSP * soLuong) * 0.95; // Thành tiền = (Số lượng * Giá SP) - 5%
    }

    // Getters and Setters
    public String getMaKH() {
        return maKH;
    }

    public void setMaKH(String maKH) {
        this.maKH = maKH;
    }

    public String getMaSP() {
        return maSP;
    }

    public void setMaSP(String maSP) {
        this.maSP = maSP;
    }

    public double getGiaSP() {
        return giaSP;
    }

    public void setGiaSP(double giaSP) {
        this.giaSP = giaSP;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(int soLuong) {
        this.soLuong = soLuong;
    }

    public double getThanhTien() {
        return thanhTien;
    }

    public void setThanhTien(double thanhTien) {
        this.thanhTien = thanhTien;
    }
}

////////////////////////////////////////////////////////
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


/**
 *
 * @author thang
 */
@WebServlet(name = "XLXoaBH", urlPatterns = {"/XLXoaBH"})
public class XLXoaBH extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLXoaBH</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLXoaBH at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String maKH = request.getParameter("maKH");
        String message;

        try (Connection conn = DatabaseConnection.getConnection()) {
            // Kiểm tra mã khách hàng
            String checkQuery = "SELECT COUNT(*) FROM banhang WHERE MaKH = ?";
            PreparedStatement checkPs = conn.prepareStatement(checkQuery);
            checkPs.setString(1, maKH);
            ResultSet rs = checkPs.executeQuery();
            rs.next();

            if (rs.getInt(1) > 0) {
                // Xóa mã khách hàng
                String deleteQuery = "DELETE FROM banhang WHERE MaKH = ?";
                PreparedStatement deletePs = conn.prepareStatement(deleteQuery);
                deletePs.setString(1, maKH);
                deletePs.executeUpdate();

                message = "Xoá thành công mã khách hàng " + maKH;
            } else {
                message = "Xoá không thành công, không tìm thấy mã khách hàng " + maKH;
            }
        } catch (Exception e) {
            message = "Lỗi: " + e.getMessage();
        }

        request.setAttribute("message", message);
        request.getRequestDispatcher("XoaBH.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

///////////////////////////////////////////////////////
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.*, java.sql.*"%>
<%@page import="model.BanHang"%>
<%@page import="model.DatabaseConnection"%>
<!DOCTYPE html>
<html>
<head>
    <title>Quản lý Bán Hàng</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }
        th, td {
            border: 1px solid black;
            padding: 10px;
            text-align: center;
        }
        th {
            background-color: #f2a93b;
        }
        .success {
            color: green;
        }
        .error {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Quản lý Bán Hàng</h1>
    <h3>Danh sách bán hàng</h3>
    <table>
        <tr>
            <th>Mã KH</th>
            <th>Mã SP</th>
            <th>Giá SP</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
        </tr>
        <%
            ArrayList<BanHang> dsBanHang = new ArrayList<>();
            try (Connection conn = DatabaseConnection.getConnection()) {
                String query = "SELECT * FROM banhang";
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery();

                while (rs.next()) {
                    String maKH = rs.getString("MaKH");
                    String maSP = rs.getString("MaSP");
                    double giaSP = rs.getDouble("GiaSP");
                    int soLuong = rs.getInt("SoLuong");

                    BanHang banHang = new BanHang(maKH, maSP, giaSP, soLuong);
                    dsBanHang.add(banHang);
                }
            } catch (SQLException e) {
                out.println("<p class='error'>Lỗi: " + e.getMessage() + "</p>");
            }

            for (BanHang bh : dsBanHang) {
        %>
            <tr>
                <td><%= bh.getMaKH() %></td>
                <td><%= bh.getMaSP() %></td>
                <td><%= bh.getGiaSP() %></td>
                <td><%= bh.getSoLuong() %></td>
                <td><%= bh.getThanhTien() %></td>
            </tr>
        <%
            }
        %>
    </table>

    <h3>Xoá thông tin Bán Hàng</h3>
    <form action="XLXoaBH" method="POST">
        <label for="maKH">Mã khách hàng:</label>
        <input type="text" id="maKH" name="maKH" value="<%= request.getParameter("maKH") != null ? request.getParameter("maKH") : "" %>">
        
        <button type="submit">Xoá</button>
    </form>
    <%
        String message = (String) request.getAttribute("message");
        if (message != null) {
            out.println("<p class='" + (message.contains("thành công") ? "success" : "error") + "'>" + message + "</p>");
        }
    %>
</body>
</html>

/////////////////////////////////////////////////////////
////////////////////////////////De14_xoaHD///////////////////////////////</body>
package model;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection {
    public static Connection getConnection() {
        try {
            String url = "jdbc:mysql://localhost:3306/qlhodan";
            String user = "root";
            String password = ""; 
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
//CREATE DATABASE QLHoDan;
//
//USE QLHoDan;
//
//CREATE TABLE HoDan (
//    MaHD VARCHAR(10) PRIMARY KEY,
//    TenCH VARCHAR(100) NOT NULL,
//    SoTV INT NOT NULL,
//    ThuNhap DECIMAL(10, 2) NOT NULL
//);
//INSERT INTO HoDan (MaHD, TenCH, SoTV, ThuNhap) VALUES
//('HD001', 'Nguyen Van A', 4, 4500000),
//('HD002', 'Tran Thi B', 5, 2900000),
//('HD003', 'Le Van C', 3, 1800000),
//('HD004', 'Hoang Thi D', 6, 5200000),
//('HD005', 'Pham Van E', 2, 2000000);

//////////////////////////////////////////////
package model;

public class HoDan {
    private String maHD;
    private String tenCH;
    private int soTV;
    private double thuNhap;

    public HoDan(String maHD, String tenCH, int soTV, double thuNhap) {
        this.maHD = maHD;
        this.tenCH = tenCH;
        this.soTV = soTV;
        this.thuNhap = thuNhap;
    }

    public String getMaHD() {
        return maHD;
    }

    public String getTenCH() {
        return tenCH;
    }

    public int getSoTV() {
        return soTV;
    }

    public double getThuNhap() {
        return thuNhap;
    }

    public double tinhTroCap() {
        if (thuNhap < 2000000) {
            return 200000 * soTV;
        } else if (thuNhap < 3000000) {
            return 100000 * soTV;
        } else if (thuNhap < 5000000) {
            return 50000 * soTV;
        }
        return 0;
    }
}

/////////////////////////////////////////////////
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;


/**
 *
 * @author thang
 */
@WebServlet(name = "XLXoaHD", urlPatterns = {"/XLXoaHD"})
public class XLXoaHD extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLXoaHD</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLXoaHD at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String maHD = request.getParameter("maHD");
        String message = "";

        try (Connection conn = DatabaseConnection.getConnection()) {
            String checkQuery = "SELECT * FROM hodan WHERE MaHD = ?";
            PreparedStatement checkStmt = conn.prepareStatement(checkQuery);
            checkStmt.setString(1, maHD);
            ResultSet rs = checkStmt.executeQuery();

            if (rs.next()) {
                String deleteQuery = "DELETE FROM hodan WHERE MaHD = ?";
                PreparedStatement deleteStmt = conn.prepareStatement(deleteQuery);
                deleteStmt.setString(1, maHD);
                deleteStmt.executeUpdate();
                message = "Xóa thành công hộ dân có mã " + maHD;
            } else {
                message = "Không tồn tại hộ dân có mã " + maHD + " cần xoá.";
            }
        } catch (Exception e) {
            message = "Lỗi: " + e.getMessage();
        }

        request.setAttribute("message", message);
        request.getRequestDispatcher("XoaHD.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

////////////////////////////////////////////////////</html>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.sql.*"%>
<%@page import="java.text.NumberFormat"%>
<%@page import="model.HoDan"%>
<%@page import="model.DatabaseConnection"%>
<!DOCTYPE html>
<html>
<head>
    <title>Xóa Hộ Dân</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f9f9f9; }
        table { width: 80%; margin: auto; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: center; }
        th { background-color: #f4a460; color: white; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        button { background-color: #ff4500; color: white; border: none; padding: 10px 20px; }
        form { text-align: center; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Danh sách hộ dân</h1>
    <table>
        <tr>
            <th>Mã Hộ Dân</th>
            <th>Tên Chủ Hộ</th>
            <th>Số Thành Viên</th>
            <th>Thu Nhập</th>
            <th>Tiền Trợ Cấp</th>
        </tr>
        <%
            ArrayList<HoDan> dsHoDan = new ArrayList<>();
            try (Connection conn = DatabaseConnection.getConnection()) {
                String query = "SELECT * FROM hodan";
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery();
                
                while (rs.next()) {
                    HoDan hd = new HoDan(
                        rs.getString("MaHD"),
                        rs.getString("TenCH"),
                        rs.getInt("SoTV"),
                        rs.getDouble("ThuNhap")
                    );
                    dsHoDan.add(hd);
                }
            } catch (SQLException e) {
                out.println("<p style='color:red;'>Lỗi: " + e.getMessage() + "</p>");
            }

            NumberFormat nf = NumberFormat.getInstance();
            nf.setGroupingUsed(true);
            for (HoDan hd : dsHoDan) {
        %>
        <tr>
            <td><%= hd.getMaHD() %></td>
            <td><%= hd.getTenCH() %></td>
            <td><%= hd.getSoTV() %></td>
            <td><%= nf.format(hd.getThuNhap()) %> VNĐ</td>
            <td><%= nf.format(hd.tinhTroCap()) %> VNĐ</td>
        </tr>
        <%
            }
        %>
    </table>
    <form action="XLXoaHD" method="POST">
        <label for="maHD">Nhập mã hộ dân cần xoá:</label>
       
        <input type="text" id="maHD" name="maHD" value="<%= request.getParameter("maHD") != null ? request.getParameter("maHD") : "" %>">
        <button type="submit">Xoá</button>
    </form>
    <div style="text-align: center; color: red; font-weight: bold;">
        <%= request.getAttribute("message") != null ? request.getAttribute("message") : "" %>
    </div>
</body>
</html>

///////////////////////////////////////////////////////////
////////////////////////////////De15_Xóaach///////////////////////////////</body>
package model;

import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection {
    public static Connection getConnection() {
        try {
            String url = "jdbc:mysql://localhost:3306/qlsach";
            String user = "root";
            String password = ""; 
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(url, user, password);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
}
//CREATE DATABASE QLSach;
//
//USE QLSach;
//
//CREATE TABLE Sach (
//    MaSach VARCHAR(10) PRIMARY KEY,
//    TenSach VARCHAR(100) NOT NULL,
//    SoLuong INT NOT NULL,
//    DonGia DECIMAL(10, 2) NOT NULL
//);
//INSERT INTO Sach (MaSach, TenSach, SoLuong, DonGia) VALUES
//('S001', 'Sách Toán', 12, 50000),
//('S002', 'Sách Văn', 8, 40000),
//('S003', 'Sách Anh', 3, 60000),
//('S004', 'Sách Lý', 15, 55000),
//('S005', 'Sách Hóa', 6, 45000);

///////////////////////////////////////////////////////</html>
package model;

public class Sach {
    private String maSach;
    private String tenSach;
    private int soLuong;
    private double donGia;

    public Sach(String maSach, String tenSach, int soLuong, double donGia) {
        this.maSach = maSach;
        this.tenSach = tenSach;
        this.soLuong = soLuong;
        this.donGia = donGia;
    }

    public String getMaSach() {
        return maSach;
    }

    public String getTenSach() {
        return tenSach;
    }

    public int getSoLuong() {
        return soLuong;
    }

    public double getDonGia() {
        return donGia;
    }

    public double tinhChietKhau() {
        double thanhTien = soLuong * donGia;
        if (soLuong > 10) {
            return 0.05 * thanhTien;
        } else if (soLuong > 5) {
            return 0.03 * thanhTien;
        }
        return 0;
    }
}

///////////////////////////////////////////////////</editor-fold></editor-fold>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLXoaSach", urlPatterns = {"/XLXoaSach"})
public class XLXoaSach extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLXoaSach</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLXoaSach at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String maSach = request.getParameter("maSach");
        String message = "";

        try (Connection conn = DatabaseConnection.getConnection()) {
            String checkQuery = "SELECT * FROM sach WHERE MaSach = ?";
            PreparedStatement checkStmt = conn.prepareStatement(checkQuery);
            checkStmt.setString(1, maSach);
            ResultSet rs = checkStmt.executeQuery();

            if (rs.next()) {
                String deleteQuery = "DELETE FROM sach WHERE MaSach = ?";
                PreparedStatement deleteStmt = conn.prepareStatement(deleteQuery);
                deleteStmt.setString(1, maSach);
                deleteStmt.executeUpdate();
                message = "Xóa thành công sách có mã " + maSach;
            } else {
                message = "Không tồn tại sách có mã " + maSach + " cần xoá.";
            }
        } catch (Exception e) {
            message = "Lỗi: " + e.getMessage();
        }

        request.setAttribute("message", message);
        request.getRequestDispatcher("XoaSach.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

//////////////////////////////////////////</html>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.sql.*"%>
<%@page import="java.text.NumberFormat"%>
<%@page import="model.Sach"%>
<%@page import="model.DatabaseConnection"%>
<!DOCTYPE html>
<html>
<head>
    <title>Xóa Sách</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f9f9f9; }
        table { width: 80%; margin: auto; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: center; }
        th { background-color: #f4a460; color: white; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        button { background-color: #ff4500; color: white; border: none; padding: 10px 20px; }
        form { text-align: center; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Danh sách sách</h1>
    <table>
        <tr>
            <th>Mã Sách</th>
            <th>Tên Sách</th>
            <th>Số Lượng</th>
            <th>Đơn Giá</th>
            <th>Chiết Khấu</th>
        </tr>
        <%
            ArrayList<Sach> dsSach = new ArrayList<>();
            try (Connection conn = DatabaseConnection.getConnection()) {
                String query = "SELECT * FROM sach";
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    Sach sach = new Sach(
                        rs.getString("MaSach"),
                        rs.getString("TenSach"),
                        rs.getInt("SoLuong"),
                        rs.getDouble("DonGia")
                    );
                    dsSach.add(sach);
                }
            } catch (SQLException e) {
                out.println("<p style='color:red;'>Lỗi: " + e.getMessage() + "</p>");
            }

            NumberFormat nf = NumberFormat.getInstance();
            nf.setGroupingUsed(true);
            for (Sach sach : dsSach) {
        %>
        <tr>
            <td><%= sach.getMaSach() %></td>
            <td><%= sach.getTenSach() %></td>
            <td><%= sach.getSoLuong() %></td>
            <td><%= nf.format(sach.getDonGia()) %> VNĐ</td>
            <td><%= nf.format(sach.tinhChietKhau()) %> VNĐ</td>
        </tr>
        <%
            }
        %>
    </table>
    <form action="XLXoaSach" method="POST">
        <label for="maSach">Nhập mã sách cần xoá:</label>
        
        <input type="text" id="maSach" name="maSach" value="<%= request.getParameter("maSach") != null ? request.getParameter("maSach") : "" %>">
        <button type="submit">Xoá</button>
    </form>
    <div style="text-align: center; color: red; font-weight: bold;">
        <%= request.getAttribute("message") != null ? request.getAttribute("message") : "" %>
    </div>
</body>
</html>

//////////////////////////////////////////////////
/////////////////////////////////De16_XoaTC/////////////////////////</body>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

/**
 *
 * @author thang
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    // Đảm bảo sử dụng đúng JDBC URL, username và password của cơ sở dữ liệu của bạn.
    private static final String URL = "jdbc:mysql://localhost:3306/qltc";
    private static final String USER = "root";
    private static final String PASSWORD = "";  // Đổi mật khẩu phù hợp

    public static Connection getConnection() throws SQLException {
        try {
            // Kết nối đến cơ sở dữ liệu
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            throw new SQLException("Lỗi khi tải driver MySQL: " + e.getMessage(), e);
        }
    }
}
//-- Tạo cơ sở dữ liệu QLTapChi
//CREATE DATABASE QLTapChi;
//
//-- Sử dụng cơ sở dữ liệu QLTapChi
//USE QLTapChi;
//
//-- Tạo bảng TapChi
//CREATE TABLE TapChi (
//    MaTC VARCHAR(10) PRIMARY KEY, -- Mã tạp chí, độ dài tối đa 10 ký tự
//    TenTC VARCHAR(100) NOT NULL,  -- Tên tạp chí, tối đa 100 ký tự
//    NhaXB VARCHAR(100) NOT NULL, -- Nhà xuất bản, tối đa 100 ký tự
//    NamXB INT CHECK (NamXB >= 1900 AND NamXB <= YEAR(CURDATE())), -- Năm xuất bản, phải hợp lệ
//    GiaBia DECIMAL(10, 2) NOT NULL -- Giá bìa, định dạng tiền tệ
//);
//INSERT INTO TapChi (MaTC, TenTC, NhaXB, NamXB, GiaBia)
//VALUES
//('TC001', 'Khoa Học & Đời Sống', 'NXB Tri Thức', 2024, 50000),
//('TC002', 'Công Nghệ Thông Tin', 'NXB CNTT', 2023, 70000),
//('TC003', 'Kinh Tế Việt Nam', 'NXB Kinh Tế', 2022, 60000),
//('TC004', 'Văn Học Việt Nam', 'NXB Văn Học', 2021, 45000),
//('TC005', 'Tạp Chí Y Học', 'NXB Y Học', 2020, 55000);

//////////////////////////////////////////////////////
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Model;

public class TapChi {
    private String MaTC;  
    private String TenTC; 
    private String NhaXB; 
    private int NamXB;   
    private double GiaBia; 
    private double GiaBan; 

    // Constructor
    public TapChi(String MaTC, String TenTC, String NhaXB, int NamXB, double GiaBia) {
        this.MaTC = MaTC;
        this.TenTC = TenTC;
        this.NhaXB = NhaXB;
        this.NamXB = NamXB;
        this.GiaBia = GiaBia;

        // Tính giá bán
        if (NamXB == 2024) {
            this.GiaBan = GiaBia;
        } else if (NamXB == 2023 || NamXB == 2022) {
            this.GiaBan = GiaBia * 0.95;
        } else {
            this.GiaBan = GiaBia * 0.90;
        }
    }

    // Getter và Setter
    public String getMaTC() {
        return MaTC;
    }

    public void setMaTC(String maTC) {
        MaTC = maTC;
    }

    public String getTenTC() {
        return TenTC;
    }

    public void setTenTC(String tenTC) {
        TenTC = tenTC;
    }

    public String getNhaXB() {
        return NhaXB;
    }

    public void setNhaXB(String nhaXB) {
        NhaXB = nhaXB;
    }

    public int getNamXB() {
        return NamXB;
    }

    public void setNamXB(int namXB) {
        NamXB = namXB;
    }

    public double getGiaBia() {
        return GiaBia;
    }

    public void setGiaBia(double giaBia) {
        GiaBia = giaBia;
    }

    public double getGiaBan() {
        return GiaBan;
    }

    public void setGiaBan(double giaBan) {
        GiaBan = giaBan;
    }
}

////////////////////////////////////////////////////////</html>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package Model;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLXoaTC", urlPatterns = {"/XLXoaTC"})
public class XLXoaTC extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLXoaTC</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLXoaTC at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String maTC = request.getParameter("MaTC");
        String message;

        try {
           
            Connection conn = DBConnection.getConnection();

            String checkQuery = "SELECT * FROM tapchi WHERE MaTC = ?";
            PreparedStatement checkStmt = conn.prepareStatement(checkQuery);
            checkStmt.setString(1, maTC);
            ResultSet rs = checkStmt.executeQuery();

            if (rs.next()) {
                
                String deleteQuery = "DELETE FROM tapchi WHERE MaTC = ?";
                PreparedStatement deleteStmt = conn.prepareStatement(deleteQuery);
                deleteStmt.setString(1, maTC);
                deleteStmt.executeUpdate();
                message = "Đã xóa tạp chí có mã " + maTC + ".";
            } else {
            
                message = "Không tồn tại tạp chí có mã " + maTC + " cần xóa.";
            }

            conn.close();
        } catch (Exception e) {
            message = "Lỗi: " + e.getMessage();
        }

        request.setAttribute("message", message);
        request.getRequestDispatcher("XoaTC.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

/////////////////////////////////////////////////////</SinhVien>
<%-- 
    Document   : XoaTC
    Created on : Dec 7, 2024, 7:17:51 PM
    Author     : thang
--%>

<%@page import="Model.DBConnection"%>
<%@page import="Model.TapChi"%>
<%@page import="java.sql.*"%>
<%@page import="java.util.*"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%
    Connection conn = DBConnection.getConnection();
    Statement stmt = conn.createStatement();
    ResultSet rs = stmt.executeQuery("SELECT * FROM tapchi");
    List<Map<String, Object>> tapChiList = new ArrayList<>();
    while (rs.next()) {
        Map<String, Object> tapChi = new HashMap<>();
        tapChi.put("MaTC", rs.getString("MaTC"));
        tapChi.put("TenTC", rs.getString("TenTC"));
        tapChi.put("NhaXB", rs.getString("NhaXB"));
        tapChi.put("NamXB", rs.getInt("NamXB"));
        tapChi.put("GiaBia", rs.getDouble("GiaBia"));

        int namXB = rs.getInt("NamXB");
        double giaBia = rs.getDouble("GiaBia");
        double giaBan;
        if (namXB == 2024) {
            giaBan = giaBia;
        } else if (namXB == 2023 || namXB == 2022) {
            giaBan = giaBia * 0.95;
        } else {
            giaBan = giaBia * 0.90;
        }
        tapChi.put("GiaBan", giaBan);
        tapChiList.add(tapChi);
    }
%>

<!DOCTYPE html>
<html>
<head>
    <title>Đàm Bá Thắng Xóa Tạp Chí</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f8fb;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table, th, td {
            border: 1px solid #ddd;
        }
        th, td {
            padding: 10px;
            text-align: left;
        }
        th {
            background-color: #007bff;
            color: white;
        }
        form {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>Đàm Bá Thắng Xóa Tạp Chí</h1>
    <form action="XLXoaTC" method="post">
        <label for="MaTC">Nhập mã tạp chí cần xóa:</label>
       <input type="text" id="MaTC" name="MaTC" value="<%= request.getParameter("MaTC") != null ? request.getParameter("MaTC") : "" %>">
        <button type="submit">Xóa</button>
    </form>
    
    <h2>Danh sách tạp chí</h2>
    <table>
        <tr>
            <th>Mã Tạp Chí</th>
            <th>Tên Tạp Chí</th>
            <th>Nhà Xuất Bản</th>
            <th>Năm Xuất Bản</th>
            <th>Giá Bìa</th>
            <th>Giá Bán</th>
        </tr>
        <% for (Map<String, Object> tapChi : tapChiList) { %>
        <tr>
            <td><%= tapChi.get("MaTC") %></td>
            <td><%= tapChi.get("TenTC") %></td>
            <td><%= tapChi.get("NhaXB") %></td>
            <td><%= tapChi.get("NamXB") %></td>
            <td><%= tapChi.get("GiaBia") %></td>
            <td><%= tapChi.get("GiaBan") %></td>
        </tr>
        <% } %>
    </table>

    <br>
    <div style="color: red; font-weight: bold;">
        <%= request.getAttribute("message") != null ? request.getAttribute("message") : "" %>
    </div>
</body>
</html>

//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////De17_XoaDN//////////////////////////////
package model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {
    private static final String URL = "jdbc:mysql://localhost:3306/qldoanhnghiep";
    private static final String USER = "root"; 
    private static final String PASSWORD = ""; 

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
//CREATE DATABASE QLDoanhNghiep;
//
//USE QLDoanhNghiep;
//
//CREATE TABLE DoanhNghiep (
//    MaDN VARCHAR(10) PRIMARY KEY,
//    TenDN VARCHAR(100),
//    SoVDT DECIMAL(18, 2),
//    DoanhThu DECIMAL(18, 2)
//);
//
//INSERT INTO DoanhNghiep (MaDN, TenDN, SoVDT, DoanhThu) VALUES
//('DN001', 'Doanh Nghiệp A', 600000000, 50000000),
//('DN002', 'Doanh Nghiệp B', 400000000, 30000000),
//('DN003', 'Doanh Nghiệp C', 700000000, 80000000),
//('DN004', 'Doanh Nghiệp D', 300000000, 20000000),
//('DN005', 'Doanh Nghiệp E', 800000000, 100000000);

//////////////////////////////////////////////////</></>
package model;

public class DoanhNghiep {
    private String maDN;
    private String tenDN;
    private double soVDT;
    private double doanhThu;

    public DoanhNghiep(String maDN, String tenDN, double soVDT, double doanhThu) {
        this.maDN = maDN;
        this.tenDN = tenDN;
        this.soVDT = soVDT;
        this.doanhThu = doanhThu;
    }

    public String getMaDN() {
        return maDN;
    }

    public String getTenDN() {
        return tenDN;
    }

    public double getSoVDT() {
        return soVDT;
    }

    public double getDoanhThu() {
        return doanhThu;
    }

    public double tinhThue() {
        return soVDT > 500000000 ? 0.1 * doanhThu : 0.05 * doanhThu;
    }
}

/////////////////////////////////////////////////////////////</editor-fold>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import model.DatabaseConnection;

/**
 *
 * @author thang
 */
@WebServlet(name = "XLXoaDN", urlPatterns = {"/XLXoaDN"})
public class XLXoaDN extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLXoaDN</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLXoaDN at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String maDN = request.getParameter("maDN");
        String message = "";

        try (Connection conn = DatabaseConnection.getConnection()) {
            String checkQuery = "SELECT * FROM doanhnghiep WHERE MaDN = ?";
            PreparedStatement psCheck = conn.prepareStatement(checkQuery);
            psCheck.setString(1, maDN);
            ResultSet rs = psCheck.executeQuery();

            if (rs.next()) {
                String deleteQuery = "DELETE FROM doanhnghiep WHERE MaDN = ?";
                PreparedStatement psDelete = conn.prepareStatement(deleteQuery);
                psDelete.setString(1, maDN);
                psDelete.executeUpdate();
                message = "Xóa thành công doanh nghiệp có mã: " + maDN;
            } else {
                message = "Không tồn tại doanh nghiệp có mã: " + maDN;
            }
        } catch (SQLException e) {
            message = "Lỗi: " + e.getMessage();
        }

        request.setAttribute("message", message);
        request.getRequestDispatcher("XoaDN.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

///////////////////////////////////////////////////////////////</body>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.sql.*"%>
<%@page import="java.text.NumberFormat"%>
<%@page import="model.DoanhNghiep"%>
<%@page import="model.DatabaseConnection"%>
<!DOCTYPE html>
<html>
<head>
    <title>Xóa Doanh Nghiệp</title>
    <style>
        /* CSS để làm đẹp */
        body { font-family: Arial, sans-serif; background-color: #f9f9f9; }
        table { width: 80%; margin: auto; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: center; }
        th { background-color: #f4a460; color: white; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        button { background-color: #ff4500; color: white; border: none; padding: 10px 20px; }
        form { text-align: center; margin-top: 20px; }
    </style>
</head>
<body>
    <h1>Danh sách doanh nghiệp</h1>
    <table>
        <tr>
            <th>Mã DN</th>
            <th>Tên DN</th>
            <th>Số VĐT</th>
            <th>Doanh Thu</th>
            <th>Thuế</th>
        </tr>
        <%
            ArrayList<DoanhNghiep> dsDN = new ArrayList<>();
            try (Connection conn = DatabaseConnection.getConnection()) {
                String query = "SELECT * FROM doanhnghiep";
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    DoanhNghiep dn = new DoanhNghiep(
                        rs.getString("MaDN"),
                        rs.getString("TenDN"),
                        rs.getDouble("SoVDT"),
                        rs.getDouble("DoanhThu")
                    );
                    dsDN.add(dn);
                }
            } catch (SQLException e) {
                out.println("<p style='color:red;'>Lỗi: " + e.getMessage() + "</p>");
            }

            NumberFormat nf = NumberFormat.getInstance(); // Định dạng số
            nf.setGroupingUsed(true); // Bật phân cách hàng nghìn
            for (DoanhNghiep dn : dsDN) {
        %>
        <tr>
            <td><%= dn.getMaDN() %></td>
            <td><%= dn.getTenDN() %></td>
            <td><%= nf.format(dn.getSoVDT()) %> VNĐ</td>
            <td><%= nf.format(dn.getDoanhThu()) %> VNĐ</td>
            <td><%= nf.format(dn.tinhThue()) %> VNĐ</td>
        </tr>
        <%
            }
        %>
    </table>
    <form action="XLXoaDN" method="POST">
        <label for="maDN">Nhập mã DN cần xoá:</label>
        <input type="text" id="maDN" name="maDN" value="<%= request.getParameter("maDN") != null ? request.getParameter("maDN") : "" %>">
        <button type="submit">Xoá</button>
    </form>
    <div style="text-align: center; color: red; font-weight: bold;">
        <%= request.getAttribute("message") != null ? request.getAttribute("message") : "" %>
    </div>
</body>
</html>

////////////////////////////////////////////////////
///////////////////////////////De18_XoaCB///////////////////////////</body>
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package model;

/**
 *
 * @author thang
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    // Đảm bảo sử dụng đúng JDBC URL, username và password của cơ sở dữ liệu của bạn.
    private static final String URL = "jdbc:mysql://localhost:3306/qlcanbo";
    private static final String USER = "root";
    private static final String PASSWORD = "";  // Đổi mật khẩu phù hợp

    public static Connection getConnection() throws SQLException {
        try {
            // Kết nối đến cơ sở dữ liệu
            Class.forName("com.mysql.cj.jdbc.Driver");
            return DriverManager.getConnection(URL, USER, PASSWORD);
        } catch (ClassNotFoundException e) {
            throw new SQLException("Lỗi khi tải driver MySQL: " + e.getMessage(), e);
        }
    }
}
//CREATE DATABASE QLCanBo;
//
//USE QLCanBo;
//
//CREATE TABLE CanBo (
//    MaCB VARCHAR(10) PRIMARY KEY,
//    TenCB NVARCHAR(50),
//    NamVN INT,
//    HeSL FLOAT
//);
//
//INSERT INTO CanBo (MaCB, TenCB, NamVN, HeSL)
//VALUES
//('CB001', N'Nguyễn Văn A', 2005, 3.2),
//('CB002', N'Lê Thị B', 2010, 2.8),
//('CB003', N'Trần Văn C', 2012, 2.5),
//('CB004', N'Phạm Thị D', 2008, 3.0),
//('CB005', N'Hồ Văn E', 2006, 3.5);

//////////////////////////////////////////////</html></html>
package model;

public class CanBo {
    private String maCB;
    private String tenCB;
    private int namVN;
    private float heSL;

    public CanBo() {}

    public CanBo(String maCB, String tenCB, int namVN, float heSL) {
        this.maCB = maCB;
        this.tenCB = tenCB;
        this.namVN = namVN;
        this.heSL = heSL;
    }

    public String getMaCB() {
        return maCB;
    }

    public void setMaCB(String maCB) {
        this.maCB = maCB;
    }

    public String getTenCB() {
        return tenCB;
    }

    public void setTenCB(String tenCB) {
        this.tenCB = tenCB;
    }

    public int getNamVN() {
        return namVN;
    }

    public void setNamVN(int namVN) {
        this.namVN = namVN;
    }

    public float getHeSL() {
        return heSL;
    }

    public void setHeSL(float heSL) {
        this.heSL = heSL;
    }

    public int tinhThamNien() {
        int currentYear = java.util.Calendar.getInstance().get(java.util.Calendar.YEAR);
        return currentYear - this.namVN;
    }

    @Override
    public String toString() {
        return "CanBo{" +
               "maCB='" + maCB + '\'' +
               ", tenCB='" + tenCB + '\'' +
               ", namVN=" + namVN +
               ", heSL=" + heSL +
               ", thamNien=" + tinhThamNien() +
               '}';
    }
}

///////////////////////////////////////////////////
/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/Servlet.java to edit this template
 */
package model;

import java.io.IOException;
import java.io.PrintWriter;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;



/**
 *
 * @author thang
 */
@WebServlet(name = "XLXoaCB", urlPatterns = {"/XLXoaCB"})
public class XLXoaCB extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
            out.println("<!DOCTYPE html>");
            out.println("<html>");
            out.println("<head>");
            out.println("<title>Servlet XLXoaCB</title>");
            out.println("</head>");
            out.println("<body>");
            out.println("<h1>Servlet XLXoaCB at " + request.getContextPath() + "</h1>");
            out.println("</body>");
            out.println("</html>");
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String maCB = request.getParameter("maCB");
        String message = null;



        try  {
            Connection conn = DatabaseConnection.getConnection();
            // Kiểm tra xem mã CB có tồn tại không
            String checkQuery = "SELECT * FROM canbo WHERE MaCB = ?";
            PreparedStatement checkPs = conn.prepareStatement(checkQuery);
            checkPs.setString(1, maCB);
            ResultSet rs = checkPs.executeQuery();

            if (rs.next()) {

                // Xoá cán bộ
                String deleteQuery = "DELETE FROM canbo WHERE MaCB = ?";
                PreparedStatement deletePs = conn.prepareStatement(deleteQuery);
                deletePs.setString(1, maCB);
                deletePs.executeUpdate();
                message = "Đã xóa tạp chí có mã " + maCB + ".";
            } else {
            
                message = "Không tồn tại tạp chí có mã " + maCB + " cần xóa.";
            }
        } catch (Exception e) {
            request.setAttribute("error", "Lỗi: " + e.getMessage());
        }

      
        request.setAttribute("message", message);
        request.getRequestDispatcher("/XoaCB.jsp").forward(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        doGet(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}

///////////////////////////////////////////////////////////
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@page import="java.util.ArrayList"%>
<%@page import="java.sql.*"%>
<%@page import="model.CanBo"%>
<%@page import="model.DatabaseConnection"%>
<!DOCTYPE html>
<html>
<head>
    <title>Xoá Cán Bộ</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fff5e6;
            color: #333;
            margin: 0;
            padding: 0;
        }
        h1, h2 {
            color: #b30000; /* Đỏ đô */
            text-align: center;
        }
        table {
            width: 80%;
            margin: 20px auto;
            border-collapse: collapse;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        th, td {
            border: 1px solid #ddd;
            padding: 10px;
            text-align: center;
        }
        th {
            background-color: #ffa64d; /* Cam */
            color: white;
        }
        tr:nth-child(even) {
            background-color: #ffebcc; /* Vàng nhạt */
        }
        tr:hover {
            background-color: #ffd9b3; /* Vàng đậm */
        }
        td {
            color: #333;
        }
        div {
            text-align: center;
        }
        form {
            width: 50%;
            margin: 20px auto;
            padding: 20px;
            background-color: #ffe6cc; /* Cam nhạt */
            border: 1px solid #ffcc99;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        label {
            display: block;
            margin-bottom: 10px;
            font-weight: bold;
            color: #b30000; /* Đỏ đô */
        }
        input[type="text"] {
            width: 100%;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
        }
        button {
            background-color: #b30000; /* Đỏ đô */
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #800000; /* Đỏ đậm */
        }
        .message {
            margin: 20px auto;
            color: #ff3300; /* Đỏ cam */
            font-weight: bold;
        }
    </style>
</head>
<body>
    <h1>Danh sách cán bộ</h1>
    <table>
        <tr>
            <th>Mã CB</th>
            <th>Tên CB</th>
            <th>Năm vào ngành</th>
            <th>Hệ số lương</th>
            <th>Thâm niên</th>
        </tr>
        <%
            ArrayList<CanBo> dsCanBo = new ArrayList<>();
            try (Connection conn = DatabaseConnection.getConnection()) {
                String query = "SELECT * FROM canbo";
                PreparedStatement ps = conn.prepareStatement(query);
                ResultSet rs = ps.executeQuery();
                while (rs.next()) {
                    CanBo cb = new CanBo(
                        rs.getString("MaCB"),
                        rs.getString("TenCB"),
                        rs.getInt("NamVN"),
                        rs.getFloat("HeSL")
                    );
                    dsCanBo.add(cb);
                }
            } catch (SQLException e) {
                out.println("Lỗi: " + e.getMessage());
            }

            for (CanBo cb : dsCanBo) {
        %>
            <tr>
                <td><%= cb.getMaCB() %></td>
                <td><%= cb.getTenCB() %></td>
                <td><%= cb.getNamVN() %></td>
                <td><%= cb.getHeSL() %></td>
                <td><%= cb.tinhThamNien() %></td>
            </tr>
        <%
            }
        %>
    </table>
    <br>
    <div class="message">
        <%= request.getAttribute("message") != null ? request.getAttribute("message") : "" %>
    </div>
    <h2>Xoá cán bộ</h2>
    <form action="XLXoaCB" method="POST">
        <label for="maCB">Mã cán bộ cần xoá:</label>
        <input 
            type="text" 
            id="maCB" 
            name="maCB" 
            value="<%= request.getParameter("maCB") != null ? request.getParameter("maCB") : "" %>" 
            required>
        <button type="submit">Xoá</button>
    </form>
</body>
</html>
