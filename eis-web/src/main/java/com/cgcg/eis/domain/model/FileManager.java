package com.cgcg.eis.domain.model;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;
@Data
@Entity
@Table(name = "file_manager")
public class FileManager {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;
    private String fileUrl;
    private String fileName;
    private Long fileSize;
    private String fileType;
    private Byte type;
    private Date createTime;

}
